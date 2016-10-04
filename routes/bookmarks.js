const express = require('express');
const jsonParser = require('body-parser').json();
const queries = require('../db/queries');

const db = require('../pgp');

const router = express.Router();

/**
 * @description `GET /bookmarks` endpoint. Returns an array of all the bookmarks associated with an
 * authenticated user. A bookmark record normally consist of an id, url, title, description, a
 * folder id, and a customer id (i.e. the owner/creator of a bookmark). For the connivence of the
 * front-end, the endpoint also returns the folder name, an array of all users with access to the
 * bookmark, and a list of tags. If the user doesn't exit in the database, they are added and an
 * empty array is returned.
 */
router.get('/', (request, response) => {
  // Some user_id's are numbers and some are alphanumeric.
  const userIdentity = `${request.user.identities[0].user_id}`;
  const email = request.user.email;

  db.manyOrNone(queries.SELECT_BOOKMARK, [userIdentity])
    .then((data) => {
      const resultsToReturn = data;

      // Customer has either, just registered or has not created any bookmarks.
      // Try to insert potential new customer.
      if (!resultsToReturn.length) {
        db.oneOrNone(queries.INSERT_CUSTOMER, [userIdentity, email])
          .then(() => {
            response.json(resultsToReturn);
          })
          .catch((error) => {
            response.json(error);
          });

        // Returning customer with bookmarks, return them with tags seperated into an array of
        // objects.
      } else {
        console.log('GET SELECT_BOOKMARK', resultsToReturn);
        for (let i = 0; i < resultsToReturn.length; i++) {
          if (resultsToReturn[i].tags[0] !== null) {
            resultsToReturn[i].tags = resultsToReturn[i].tags.map((current) => {
              const temp = current.split(',');
              return {
                tagid: parseInt(temp[0], 10),
                tagname: temp[1],
              };
            });
          }
        }
        console.log('RESPOSE SELECT_BOOKMARK: ', resultsToReturn);
        response.json(resultsToReturn);
      }
    })
    .catch((error) => {
      console.log('ERROR:', error.message || error);
      response.status(500);
    });
});

/**
 * @description `POST /bookmarks` endpoint. Inserts a bookmark into the database and associates it
 * with a folder and tag(s). The bookmark is automatically assigned to the authenticated customer.
 * If insertion into database is successful, then the new bookmark plus tags are returned to the
 * caller. Takes An object with the following fields: url, title, description (optional), folderid,
 * foldername, screenshot (optional), and an array of tags (optional).
 */
router.post('/', jsonParser, (request, response) => {
  // Some user_id's are numbers and some are alphanumeric.
  const userIdentity = `${request.user.identities[0].user_id}`;

  console.log(request.body, '<<<< SERVER > REQUEST BODY');

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
  } else if (typeof request.body.tags === 'string' || !Array.isArray(request.body.tags)) {
    response.status(422).json({
      message: 'Incorrect field type: tags',
    });
  } else {
    // Handle the two optional bookmark fields and the optional tag array. If user did not
    // provide a value use defaults.
    const bdescription = request.body.description ? request.body.description : '';
    const bscreenshot = request.body.screenshot ?
      request.body.screenshot : '/img/placeholder.png';

    const url = request.body.url;
    const title = request.body.title;
    const folderid = request.body.folderid;
    const tags = request.body.tags;

    // @FIXME: This is probably really bad practice. resultsToReturn stores information
    // about the inserted bookmark and tags. Is there a way of passing this through the
    // callback chain?
    let resultsToReturn = {};

    // Database transaction, all queries within will either complete or fail.
    db.tx((t) => {
        // First insert new bookmark
      return t.one(queries.INSERT_BOOKMARK, [url, title, bdescription,
            folderid, bscreenshot, userIdentity, folderid,
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

/**
 * @description `PUT /bookmarks/:bookmarkid` endpoint. Updates a bookmark and it's associations in
 * the database. If the update is successful, then the edited bookmark is returned to the caller.
 * Takes an object with the following fields: url, title, description (optional), folderid,
 * foldername, screenshot (optional), and an array of tags.
 */
router.put('/:bookmarkid', jsonParser, (request, response) => {
  console.log(request.body, '<<<< SERVER > REQUEST BODY');
  const bookmarkid = request.params.bookmarkid;
  // Some user_id's are numbers and some are alphanumeric.
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
      request.body.screenshot : '/img/placeholder.png';

    const url = request.body.url;
    const title = request.body.title;
    const folderid = request.body.folderid;
    const tags = request.body.tags;

    let resultsToReturn = {};

    // Database transaction, all queries within will either complete or fail.
    db.tx((t) => {
      return t.manyOrNone(queries.SELECT_TAGNAME, [userIdentity, bookmarkid]).then((tagnames) => {
        console.log(tagnames[0], '<<< tagnames');
        const oldTags = tagnames[0] || [];
        console.log('SELECT_TAGNAME oldTags: ', oldTags);
        let add = []; // Not in oldTags, add tag if necessary and BOOKMARK_TAG reference.
        const del = []; // In oldTags but not in tags, remove BOOKMARK_TAG reference.

        // If the bookmark already had tags, then we figure out what to add and what to delete
        if (oldTags.tagarray) {
          for (let i = 0; i < tags.length; i++) {
            console.log(`${oldTags.tagarray.indexOf(tags[i]) < 0} && !${tags[i]}`);
            if (oldTags.tagarray.indexOf(tags[i]) < 0) {
              add.push(tags[i]);
            }
          }
          for (let i = 0; i < oldTags.tagarray.length; i++) {
            if (tags.indexOf(oldTags.tagarray[i]) < 0) {
              del.push(oldTags.tagarray[i]);
            }
          }
        } else {
          // No tags were previously associated with the bookmark, just add the new tags.
          add = tags;
        }

        console.log(add, del);
        // Create an array of queries for both inserting new tags and deleting old tags
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
 * Deletes the bookmark with the specified id. Deleting a bookmark does not remove a tags or
 * folders. If deleting from the database is successful, then the deleted bookmark is returned to
 * the caller.
 */
router.delete('/:bookmarkid', (request, response) => {
  const bookmarkid = request.params.bookmarkid;
  // Some user_id's are numbers and some are alphanumeric.
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
