var pg = require('pg');
var express = require('express');
var jsonParser = require('body-parser').json();
var queries = require('../db/queries');
var getBookmarks = require('../get_function');
var delBookmarkFolder = require('../delete_function');

var router = express.Router();

/**
 * @description `GET /tags/bookmarks/:tagName` endpoint; returns an array of
 * bookmarks with the provided tag name.
 */
router.get('/bookmarks/:tagName', function(request, response) {
  getBookmarks('', request.params.tagName).then(function(result) {
    response.json(result.rows);
  }, function(err) {
    response.status('404').json(err);
  });
});

/**
 * @description `GET /tags` endpoint; returns an array of
 * tags stored in the database.
 */
router.get('/', function(request, response) {
  var client = new pg.Client(queries.CONNECT_URL);
  client.connect(function(err) {
    if (err) {
      console.error(err);
      response.sendStatus('500');
    }
    client.query(queries.SELECT_TAG, function(err, result) {
      if (err) {
        console.error(err);
        response.sendStatus('500');
      }

      // Convert the array of tag objects returned from database
      // into an array of Strings.
      var resultsToReturn = result.rows.map(function(value) {
        return value.tag;
      });

      response.json(resultsToReturn);

      // disconnect the client
      client.end(function(err) {
        if (err) throw err;
      });
    });
  });
});

module.exports = router;
