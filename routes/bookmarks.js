const express = require('express');
const jsonParser = require('body-parser').json();
const queries = require('../db/queries');
const dbConnect = require('../dbConnect');

const router = express.Router();

/**
 * @description `GET /bookmarks/:userid` enpoint; returns an array of all the
 * bookmarks associated with a given user.
 */
router.get('/:userid', (request, response) => {
  const userid = request.params.userid;

  dbConnect(queries.SELECT_BOOKMARK, [userid]).then((result) => {
    response.json(result.rows);
  }).catch((errorcode) => {
    response.status(errorcode);
  });
});

/**
 * @description `POST /bookmarks` endpoint. Takes an object with the following
 * fields: url, title, description (optional), foldername,
 * screenshot (optional), and userid. If insertion into database
 * is successful, then the new bookmark is returned to the caller.
 */
router.post('/', jsonParser, (request, response) => {
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
  } else if (!request.body.userid) {
    response.status(422).json({
      message: 'Incorrect field type: userid',
    });
  } else {
    // Handle the two optional bookmark fields. If user did not provide a
    // value use defaults.
    const bdescription = request.body.description ? request.body.description : '';
    const bscreenshot = request.body.screenshot ?
      request.body.screenshot : 'http://placekitten.com/200/300';

    dbConnect(queries.INSERT_BOOKMARK, [request.body.url, request.body.title, bdescription,
      request.body.folderid, bscreenshot, request.body.userid,
    ]).then((result) => {
      response.json(result.rows[0]);
    }).catch((errorCode) => {
      response.status(errorCode);
    });
  }
});

/**
 * @description `PUT /bookmarks/:bookmarkid` endpoint. Takes an object with the following
 * fields: url, title, description (optional), folderid,
 * screenshot (optional), and userid. If update in the database is successful, then the
 * edited bookmark is returned to the caller.
 */

router.put('/:bookmarkid', jsonParser, (request, response) => {
  const bookmarkid = request.params.bookmarkid;

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
  } else if (!request.body.userid) {
    response.status(422).json({
      message: 'Incorrect field type: userid',
    });
  } else {
    // Handle the two optional bookmark fields. If user did not provide a
    // value use defaults.
    const bdescription = request.body.description ? request.body.description : '';
    const bscreenshot = request.body.screenshot ?
      request.body.screenshot : 'http://placekitten.com/200/300';

    // Paramitarize query to protect against SQL injection
    dbConnect(queries.UPDATE_BOOKMARK, [request.body.url, request.body.title, bdescription,
      request.body.folderid, bscreenshot, request.body.userid, bookmarkid,
    ]).then((result) => {
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

  dbConnect(queries.DELETE_BOOKMARK, [id]).then((result) => {
    response.json(result.rows[0]);
  }).catch((errorCode) => {
    response.status(errorCode);
  });
});

module.exports = router;
