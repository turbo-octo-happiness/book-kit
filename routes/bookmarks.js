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

  db.any(queries.SELECT_BOOKMARK, [userIdentity])
    .then((data) => {
      if (!data.length) {
        db.oneOrNone(queries.INSERT_CUSTOMER, [userIdentity, email])
          .then(() => {
            response.json(data)
          })
          .catch((error) => {
            response.json(error);
          })
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
      console.log(error)
      response.json(error)
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

    let resultsToReturn = {};
    db.tx((t) => {
        // First insert bookmark
        return t.one(queries.INSERT_BOOKMARK, [request.body.url, request.body.title, bdescription,
            request.body.folderid, bscreenshot, userIdentity,
          ])
          .then((bookmark) => {
            console.log('bookmark inserted: ', bookmark)
            resultsToReturn = Object.assign({}, resultsToReturn, bookmark);
            let q = request.body.tags.map((tag) => {
              return t.one(queries.INSERT_TAG, [userIdentity, tag, userIdentity, tag]);
            });
            return t.batch(q)
            .then((tagidArray) => {
              console.log('request.body.tags inserted: ', tagidArray)
              resultsToReturn = Object.assign({}, resultsToReturn, {
                tags: tagidArray
              });
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
  const userIdentity = '12989626'

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
  } else {
    // Handle the two optional bookmark fields. If user did not provide a
    // value use defaults.
    const bdescription = request.body.description ? request.body.description : '';
    const bscreenshot = request.body.screenshot ?
      request.body.screenshot : 'http://placekitten.com/200/300';

    // Paramitarize query to protect against SQL injection
    dbConnect(queries.UPDATE_BOOKMARK, [request.body.url, request.body.title, bdescription,
      request.body.folderid, bscreenshot, bookmarkid, userIdentity,
    ]).then((result) => {
      if (result.rows.length === 0) {
        response.status('403').json('Only bookmark owners can edit.');
      }
      response.json(result.rows[0]);
    }).catch((errorCode) => {
      response.status(errorCode);
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
  const id = request.params.bookmarkid;
  // const userIdentity = request.user.identities[0].user_id;
  const userIdentity = '12989626'

  dbConnect(queries.DELETE_BOOKMARK, [id, userIdentity]).then((result) => {
    if (result.rows.length === 0) {
      response.status('403').json('Only bookmark owners can delete.');
    }
    response.json(result.rows[0]);
  }).catch((errorCode) => {
    response.status(errorCode);
  });
});

module.exports = router;
