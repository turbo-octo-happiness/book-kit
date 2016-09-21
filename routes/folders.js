const express = require('express');
const jsonParser = require('body-parser').json();
const queries = require('../db/queries');
const dbConnect = require('../dbConnect');

const router = express.Router();

/**
 * @description `GET /folders` endpoint; returns an array of
 * folders stored in the database.
 */
router.get('/:userid', (request, response) => {
  const userid = request.params.userid;

  // Paramitarize query to protect against SQL injection
  dbConnect(queries.SELECT_FOLDER, [userid]).then((result) => {
    // Convert the array of folder objects returned from database
    // into an array of Strings.
    const resultsToReturn = result.rows.map((value) => {
      return value;
    });

    response.json(resultsToReturn);
  }).catch((errorcode) => {
    response.status(errorcode);
  });
});

/**
 * @description `POST /folders` endpoint. Takes an object with the following
 * field: foldername. If insert into database is successful, then the
 * new folder name is returned to the caller.
 */
router.post('/', jsonParser, (request, response) => {
  console.log(request.body.foldername);
  if (!request.body.foldername) {
    response.status(422).json({
      message: 'Missing field: foldername',
    });
  } else {
    // Paramitarize query to protect against SQL injection
    dbConnect(queries.INSERT_FOLDER, [request.body.foldername]).then((result) => {
      response.json(result.rows[0]);
    }).catch((errorcode) => {
      response.status(errorcode);
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
      request.body.folderid]).then((result) => {
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
  dbConnect(queries.DELETE_FOLDER,
    [folderid]).then((result) => {
      response.json(result.rows);
    }).catch((errorcode) => {
      response.status(errorcode);
    });
});

module.exports = router;
