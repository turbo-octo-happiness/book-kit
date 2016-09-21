const express = require('express');
// const jsonParser = require('body-parser').json();
const queries = require('../db/queries');
const dbConnect = require('../dbConnect');

const router = express.Router();

/**
 * @description `GET /tags/bookmarks/:tagName` endpoint; returns an array of
 * bookmarks with the provided tag id.
 */
router.get('/bookmarks/:tagid', (request, response) => {
  const tagid = request.params.tagid;

  // Paramitarize query to protect against SQL injection
  dbConnect(queries.SELECT_BOOKMARK_BY_TAG, [tagid]).then((result) => {
    response.json(result.rows);
  }).catch((errorcode) => {
    response.status(errorcode);
  });
});

/**
 * @description `GET /tags` endpoint; returns an array of
 * tags stored in the database.
 */
router.get('/', (request, response) => {
  // Paramitarize query to protect against SQL injection
  dbConnect(queries.SELECT_TAG, []).then((result) => {
    // Convert the array of tag objects returned from database
    // into an array of Strings.
    const resultsToReturn = result.rows.map((value) => {
      return value.tag;
    });

    response.json(resultsToReturn);
  }).catch((errorcode) => {
    response.status(errorcode);
  });
});

module.exports = router;
