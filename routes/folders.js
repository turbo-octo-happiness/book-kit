const express = require('express');
const jsonParser = require('body-parser').json();
const queries = require('../db/queries');
const db = require('../pgp');

const router = express.Router();

/**
 * @description `GET /folders` endpoint; returns an array of
 * folders either owned by or shared with a customer.
 */
router.get('/', (request, response) => {
  // const userIdentity = request.user.identities[0].user_id;
  const userIdentity = '123';

  // Paramitarize query to protect against SQL injection
  db.manyOrNone(queries.SELECT_FOLDER, [userIdentity]).then((result) => {
    response.json(result);
  }).catch((error) => {
    console.log('ERROR:', error.message || error);
    response.status(500);
  });
});

/**
 * @description `POST /folders` endpoint. Takes an object with the following
 * field: foldername. If insert into database is successful, then the
 * new folder name is returned to the caller.
 */
router.post('/', jsonParser, (request, response) => {
  // const userIdentity = request.user.identities[0].user_id;
  const userIdentity = '123';

  if (!request.body.foldername) {
    response.status(422).json({
      message: 'Missing field: foldername',
    });
  } else {
    const foldername = request.body.foldername;

    // Paramitarize query to protect against SQL injection
    db.one(queries.INSERT_FOLDER, [foldername, userIdentity])
      .then((result) => {
        response.json(result);
      })
      .catch((error) => {
        console.log('ERROR:', error.message || error);
        response.status(500);
      });
  }
});

/**
 * @description `PUT /folders` endpoint. Takes an object with the following
 * fields: folderid and new foldername. If update in the database
 * is successful, then the edited folder is returned to the caller.
 */

router.put('/', jsonParser, (request, response) => {
  if (!request.body.foldername) {
    response.status(422).json({
      message: 'Missing field: foldername',
    });
  } else if (!request.body.folderid) {
    response.status(422).json({
      message: 'Missing field: folderid',
    });
  } else {
    // Paramitarize query to protect against SQL injection
    dbConnect(queries.UPDATE_FOLDER, [request.body.foldername,
      request.body.folderid,
    ]).then((result) => {
      response.json(result.rows[0]);
    }).catch((errorcode) => {
      response.status(errorcode);
    });
  }
});

/**
 * @description `DELETE /folder/:folderid` endpoint.
 * Takes :folderid and queries the database to delete the matching folder
 * If deleting from the database is successful, then the
 * deleted folder is returned to the caller.
 */
router.delete('/:folderid', (request, response) => {
  const folderid = request.params.folderid;

  // Paramitarize query to protect against SQL injection
  dbConnect(queries.DELETE_FOLDER, [folderid]).then((result) => {
    response.json(result.rows);
  }).catch((errorcode) => {
    response.status(errorcode);
  });
});

module.exports = router;
