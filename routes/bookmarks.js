const express = require('express');
const jsonParser = require('body-parser').json();
const queries = require('../db/queries');
const dbConnect = require('../dbConnect');
const db = require('../pgp');

const router = express.Router();

/**
 * @description `GET /bookmarks` endpoint; returns an array of all the
 * bookmarks associated with a given user. If the user doesn't exit in the database,
 * they are added.
 */
router.get('/', (request, response) => {
  // const userIdentity = request.user.identities[0].user_id;
  const userIdentity = '123';
  const email = 'sierragregg@Gmail.com';

  db.oneOrNone(queries.SELECT_BOOKMARK, [userIdentity])
    .then((data) => {
      if (!data.length) {
        db.oneOrNone(queries.INSERT_CUSTOMER, [userIdentity, email])
          .then(() => {
            response.json(data)
          })
          .catch((error) => {
            response.json(error);
          });
      } else {
        for (let i = 0; i < data.length; i++) {
          if (data[i].tags[0] !== null) {
            data[i].tags = data[i].tags.map((current) => {
              const temp = current.split(',');
              return {
                id: temp[0],
                tag: temp[1],
              };
            });
          }
        }
        response.json(data)
      }
    })
    .catch((error) => {
      console.log("ERROR:", error.message || error);
      response.status(500);
    })
});

/**
 * @description `POST /bookmarks` endpoint. Takes an object with the following
 * fields: url, title, description (optional), folderid,
 * screenshot (optional), and an array of tags (optional). If insertion into database
 * is successful, then the new bookmark plus tags are returned to the caller.
 */
router.post('/', jsonParser, (request, response) => {
  // const userIdentity = request.user.identities[0].user_id;
  const userIdentity = '123';

  // Validate that the required fields were passed in the body of the request.
  if (!request.body.url) {
    response.status(422).json({
      message: 'Missing field: URL',
    });
  } else if (!request.body.title) {
    response.status(422).json({
      message: 'Incorrect field type: title',
    });
  } else if (!request.body.folderid) {
    response.status(422).json({
      message: 'Incorrect field type: folderid',
    });
  } else if(typeof request.body.tags === 'string' || !Array.isArray(request.body.tags)) {
    response.status(422).json({
      message: 'Incorrect field type: tags'
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
            folderid, bscreenshot, userIdentity,
          ])
          .then((bookmark) => {
            console.log('bookmark inserted: ', bookmark)
            resultsToReturn = Object.assign({}, resultsToReturn, bookmark);
            // Then insert the array of tags
            let q = tags.map((tag) => {
              return t.one(queries.INSERT_TAG, [userIdentity, tag, userIdentity, tag]);
            });
            return t.batch(q)
            .then((tagidArray) => {
              console.log('tags inserted: ', tagidArray)
              resultsToReturn = Object.assign({}, resultsToReturn, {
                tags: tagidArray
              });
              // Then insert all tag references into the BOOKMARK_TAG table
              let q = tagidArray.map((e) => {
                return t.one(queries.INSERT_BOOKMARK_TAG, [resultsToReturn.bookmarkid, e.tagid])
              });
              return t.batch(q)
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
      .catch(function(error) {
        console.log("ERROR:", error.message || error);
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
  // const userIdentity = request.user.identities[0].user_id;
  const userIdentity = '123'

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
      message: 'Incorrect field type: tags'
    });
  } else {
    // Handle the two optional bookmark fields. If user did not provide a
    // value use defaults.
    const bdescription = request.body.description ? request.body.description : '';
    const bscreenshot = request.body.screenshot ?
      request.body.screenshot : 'http://placekitten.com/200/300';

    const url = request.body.url;
    const title = request.body.title;
    const folderid = request.body.folderid;
    const tags = request.body.tags;

    let resultsToReturn = {};
    db.tx((t) => {
        return t.one(queries.SELECT_TAGNAME, [userIdentity, bookmarkid]).then((oldTags) => {

          oldTags = oldTags.tagarray;
          console.log('SELECT_TAGNAME oldTags: ', oldTags);
          let add = []; // Not in oldTags, add BOOKMARK_TAG reference.
          let del = []; // In oldTags but not in tags, remove BOOKMARK_TAG reference.
          for (let i = 0; i < tags.length; i++) {
            if (oldTags.indexOf(tags[i]) < 0) {
              add.push(tags[i]);
            }
          }
          for (let i = 0; i < oldTags.length; i++) {
            if (tags.indexOf(oldTags[i]) < 0) {
              del.push(oldTags[i]);
            }
          }
          console.log(add, del);
          let qa = add.map((tag) => {
            return t.one(queries.INSERT_FULL_TAG, [userIdentity, tag, userIdentity, tag, bookmarkid]);
          });
          let qd = del.map((tag) => {
            return t.none(queries.DELETE_TAG_REFERENCE, [bookmarkid, tag])
          });

          let q = qa.concat(qd);
          return t.batch(q).then((results) => {
            console.log('inserted tag updates', results);

            return t.one(queries.UPDATE_BOOKMARK, [bookmarkid, url, title, bdescription,
              folderid, bscreenshot, bookmarkid, userIdentity,
            ]).then((newBookmark) => {
              console.log('inserted bookmark ===>', newBookmark)
              resultsToReturn = Object.assign({}, resultsToReturn, newBookmark);

              return t.manyOrNone(queries.SELECT_TAG_FOR_BOOKMARK, [userIdentity, bookmarkid]).then((tags) => {
                console.log('new Tags: ', tags);
                resultsToReturn = Object.assign({}, resultsToReturn, {
                  tags: tags
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
      console.log("ERROR:", error.message || error);
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
  // const userIdentity = request.user.identities[0].user_id;
  const userIdentity = '123'

  db.any(queries.DELETE_BOOKMARK, [bookmarkid, userIdentity])
    .then((delBookmark) => {
      response.json(delBookmark);
    })
    .catch((error) => {
      console.log("ERROR:", error.message || error);
      response.status(500);
    });
});

module.exports = router;
