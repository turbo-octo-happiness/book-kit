const express = require('express');
const jsonParser = require('body-parser').json();
const queries = require('../db/queries');
const dbConnect = require('../dbConnect');
// const db = require('../pgp')

const CONNECT_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/bookmarks';

const pgp = require('pg-promise')();

// Heroku's free Postgres database only supports 20 connections,
// so we limit the pool size so we never go reach Heroku's limit.
pgp.pg.defaults.poolSize = 20;
console.log('database is connecting to', CONNECT_URL);
const db = pgp(CONNECT_URL);

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
  console.log('inside get');
  db.any(queries.SELECT_BOOKMARK, [userIdentity])
    .then((data) => {
      if (!data.length) {
        db.oneOrNone(queries.INSERT_CUSTOMER, [userIdentity, email])
        .then(() => {
          console.log('inserted new customer')
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
// @TODO: insert tags when inserting bookmarks
/**
 * @description `POST /bookmarks` endpoint. Takes an object with the following
 * fields: url, title, description (optional), foldername,
 * screenshot (optional). If insertion into database
 * is successful, then the new bookmark is returned to the caller.
 */
router.post('/', jsonParser, (request, response) => {
  // const userIdentity = request.user.identities[0].user_id;
    const userIdentity = '12989626';
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
  } else {
    // Handle the two optional bookmark fields. If user did not provide a
    // value use defaults.
    const bdescription = request.body.description ? request.body.description : '';
    const bscreenshot = request.body.screenshot ?
      request.body.screenshot : 'http://placekitten.com/200/300';

    dbConnect(queries.INSERT_BOOKMARK, [request.body.url, request.body.title, bdescription,
      request.body.folderid, bscreenshot, userIdentity,
    ]).then((result) => {
      response.json(result.rows[0]);
    }).catch((errorCode) => {
      response.status(errorCode);
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
