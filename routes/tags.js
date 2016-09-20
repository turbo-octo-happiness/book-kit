const pg = require('pg');
const express = require('express');
// const jsonParser = require('body-parser').json();
const queries = require('../db/queries');
const getBookmarks = require('../get_function');

const router = express.Router();

/**
@TODO: Add id to tags table
*/

/**
 * @description `GET /tags/bookmarks/:tagName` endpoint; returns an array of
 * bookmarks with the provided tag name.
 */
router.get('/bookmarks/:tagName', (request, response) => {
  getBookmarks('', request.params.tagName).then((result) => {
    response.json(result.rows);
  }, (err) => {
    response.status('404').json(err);
  });
});

/**
 * @description `GET /tags` endpoint; returns an array of
 * tags stored in the database.
 */
router.get('/', (request, response) => {
  const client = new pg.Client(queries.CONNECT_URL);
  client.connect((err) => {
    if (err) {
      console.error(err);
      response.sendStatus('500');
    }
    client.query(queries.SELECT_TAG, (queryErr, result) => {
      if (queryErr) {
        console.error(queryErr);
        response.sendStatus('500');
      }

      // Convert the array of tag objects returned from database
      // into an array of Strings.
      const resultsToReturn = result.rows.map((value) => {
        return value.tag;
      });

      response.json(resultsToReturn);

      // disconnect the client
      client.end((exitErr) => {
        if (exitErr) throw exitErr;
      });
    });
  });
});

module.exports = router;
