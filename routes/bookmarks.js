const express = require('express');
const jsonParser = require('body-parser').json();
const queries = require('../db/queries');

const db = require('../pgp');

const router = express.Router();

/**
 * @description `GET /bookmarks` endpoint; returns an array of all the
 * bookmarks associated with a given user. If the user doesn't exit in the database,
 * they are added.
 */
router.get('/', (request, response) => {
  const userIdentity = `${request.user.identities[0].user_id}`;
  const email = request.user.email;

  db.manyOrNone(queries.SELECT_BOOKMARK, [userIdentity])
    .then((data) => {
      // Customer has either, just registered or has not created any bookmarks.
      // Try to insert potential new customer.
      if (!data.length) {
        db.oneOrNone(queries.INSERT_CUSTOMER, [userIdentity, email])
          .then(() => {
            response.json(data);
          })
          .catch((error) => {
            response.json(error);
          });
      } else {
        console.log('GET SELECT_BOOKMARK', data)
        for (let i = 0; i < data.length; i++) {
          if (data[i].tags[0] !== null) {
            data[i].tags = data[i].tags.map((current) => {
              const temp = current.split(',');
              return {
                tagid: parseInt(temp[0], 10),
                tagname: temp[1],
              };
            });
          }
        }
        console.log('RESPOSE SELECT_BOOKMARK: ', data);
        response.json(data);
      }
    })
    .catch((error) => {
      console.log("ERROR:", error.message || error);
      response.status(500);
    });
});

/**
 * @description `POST /bookmarks` endpoint. Takes an object with the following
 * fields: url, title, description (optional), folderid,
 * screenshot (optional), and an array of tags (optional). If insertion into database
 * is successful, then the new bookmark plus tags are returned to the caller.
 */
router.post('/', jsonParser, (request, response) => {
  const userIdentity = `${request.user.identities[0].user_id}`;

  // Validate that the required fields were passed in the body of the request.
  if (!request.body.url) {
    response.status(422).json({
      message: 'Missing field: URL',
    });
  } else if (!request.body.title) {
    response.status(422).json({
      message: 'Incorrect field type: title',
    });
  } else if (!request.body.foldername) {
    response.status(422).json({
      message: 'Incorrect field type: foldername',
    });
  } else if (!request.body.folderid) {
    response.status(422).json({
      message: 'Incorrect field type: folderid',
    });
  } else if (typeof request.body.tags === 'string' || !Array.isArray(request.body.tags)) {
    response.status(422).json({
      message: 'Incorrect field type: tags',
    });
  } else {
    // Handle the two optional bookmark fields and the optional tag array. If user did not
    // provide a value use defaults.
    const bdescription = request.body.description ? request.body.description : '';
    const bscreenshot = request.body.screenshot ?
      request.body.screenshot : 'http://placekitten.com/200/300';

    // @FIXME: This is probably really bad practice. resultsToReturn stores information
    // about the inserted bookmark and tags. Is there a way of passing this through the
    // callback chain?
    let resultsToReturn = {};

    const url = request.body.url;
    const title = request.body.title;
    const folderid = request.body.folderid;
    const tags = request.body.tags;

    db.tx((t) => {
        // First insert bookmark
        return t.one(queries.INSERT_BOOKMARK, [url, title, bdescription,
            folderid, bscreenshot, userIdentity, folderid
          ])
          .then((bookmark) => {
            console.log('bookmark inserted: ', bookmark);
            resultsToReturn = Object.assign({}, resultsToReturn, bookmark);
            // Then insert the array of tags
            const q = tags.map((tag) => {
              return t.one(queries.INSERT_TAG, [userIdentity, tag, userIdentity, tag]);
            });
            return t.batch(q)
              .then((tagidArray) => {
                console.log('tags inserted: ', tagidArray);
                resultsToReturn = Object.assign({}, resultsToReturn, {
                  tags: tagidArray,
                });
                // Then insert all tag references into the BOOKMARK_TAG table
                const q2 = tagidArray.map((e) => {
                  return t.one(queries.INSERT_BOOKMARK_TAG, [resultsToReturn.bookmarkid, e.tagid]);
                });
                return t.batch(q2)
                  .then((result) => {
                    console.log('book_tag inserted: ', result);
                    console.log('final result', result);
                    return resultsToReturn;
                  });
              });
          });
      })
      .then((data) => {
        console.log('transaction then', data);
        response.json(data);
      })
      .catch((error) => {
        console.log('ERROR:', error.message || error);
        response.status(500);
      });
  }
});

// @TODO: updating tags at the sametime.
/**
 * @description `PUT /bookmarks/:bookmarkid` endpoint. Takes an object with the following
 * fields: url, title, description (optional), folderid,
 * screenshot (optional). If update in the database is successful, then the
 * edited bookmark is returned to the caller.
 */

router.put('/:bookmarkid', jsonParser, (request, response) => {
  const bookmarkid = request.params.bookmarkid;
  const userIdentity = `${request.user.identities[0].user_id}`;

  if (!request.body.url) {
    response.status(422).json({
      message: 'Missing field: URL',
    });
  } else if (!request.body.title) {
    response.status(422).json({
      message: 'Incorrect field type: title',
    });
  } else if (!request.body.folderid) {
    response.status(422).json();
  } else if (typeof request.body.tags === 'string' || !Array.isArray(request.body.tags)) {
    response.status(422).json({
      message: 'Incorrect field type: tags',
    });
  } else {
    // Handle the two optional bookmark fields. If user did not provide a
    // value use defaults.
    const bdescription = request.body.description ? request.body.description : '';
    const bscreenshot = request.body.screenshot ?
      request.body.screenshot : 'placeholder.png';

    const url = request.body.url;
    const title = request.body.title;
    const folderid = request.body.folderid;
    const tags = request.body.tags;

    let resultsToReturn = {};
    db.tx((t) => {
      return t.manyOrNone(queries.SELECT_TAGNAME, [userIdentity, bookmarkid]).then((tagnames) => {
        const oldTags = tagnames.tagarray || [];
        console.log('SELECT_TAGNAME oldTags: ', oldTags);
        const add = []; // Not in oldTags, add BOOKMARK_TAG reference.
        const del = []; // In oldTags but not in tags, remove BOOKMARK_TAG reference.

        for (let i = 0; i < tags.length; i++) {
          if ((oldTags.indexOf(tags[i]) < 0 && !tags[i]) || !oldTags.length) {
            add.push(tags[i]);
          }
        }
        for (let i = 0; i < oldTags.length; i++) {
          if (tags.indexOf(oldTags[i]) < 0) {
            del.push(oldTags[i]);
          }
        }
        console.log(add, del);
        const qa = add.map((tag) => {
          return t.one(queries.INSERT_FULL_TAG, [userIdentity, tag, userIdentity, tag, bookmarkid]);
        });
        const qd = del.map((tag) => {
          return t.none(queries.DELETE_TAG_REFERENCE, [bookmarkid, tag]);
        });

        const q = qa.concat(qd);
        return t.batch(q).then((results) => {
          console.log('inserted tag updates', results);

          return t.one(queries.UPDATE_BOOKMARK, [url, title, bdescription,
            folderid, bscreenshot, bookmarkid, userIdentity, folderid,
          ]).then((newBookmark) => {
            console.log('inserted bookmark ===>', newBookmark);
            resultsToReturn = Object.assign({}, resultsToReturn, newBookmark);

            return t.manyOrNone(queries.SELECT_TAG_FOR_BOOKMARK, [userIdentity, bookmarkid])
              .then((bookmarkTags) => {
                console.log('new Tags: ', bookmarkTags);
                resultsToReturn = Object.assign({}, resultsToReturn, {
                  tags: bookmarkTags,
                });
                return resultsToReturn;
              });
          });
        });
      });
    }).then((data) => {
      console.log('then for transaction ===>', data);
      response.json(data);
    }).catch((error) => {
      console.log('ERROR:', error.message || error);
      response.status(500);
    });
  }
});

/**
 * @description `DELETE /bookmarks/:bookmarkid` endpoint.
 * Takes :bookmarkid and queries the database to delete the matching bookmark
 * If deleting from the database is successful, then the
 * deleted bookmark is returned to the caller.
 */
router.delete('/:bookmarkid', (request, response) => {
  const bookmarkid = request.params.bookmarkid;
  const userIdentity = `${request.user.identities[0].user_id}`;

  db.one(queries.DELETE_BOOKMARK, [bookmarkid, userIdentity])
    .then((delBookmark) => {
      response.json(delBookmark);
    })
    .catch((error) => {
      console.log('ERROR:', error.message || error);
      response.status(500);
    });
});

module.exports = router;
