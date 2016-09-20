var pg = require('pg');
var express = require('express');
var jsonParser = require('body-parser').json();
var queries = require('../db/queries');
var getBookmarks = require('../get_function');
var delBookmarkFolder = require('../delete_function');

var router = express.Router();

/* ---- GET REQUESTS ---- */
/**
 * @description `GET /bookmarks` enpoint; returns an array of all the
 * bookmarks stored in the database.
 */
router.get('/', function(request, response) {
  getBookmarks().then(function(result) {
    response.json(result.rows);
  }, function(err) {
    response.status('404').json(err);
  });
});

/**
 * @description `POST /bookmarks` endpoint. Takes an object with the following
 * fields: url, title, description (optional), foldername,
 * screenshot (optional). If insert into database is successful, then the
 * new bookmark is returned to the caller.
 */
router.post('/', jsonParser, function(request, response) {
  console.log('POST BOOKMARK')
  if (!request.body.url) {
    response.status(422).json({
      message: 'Missing field: URL'
    });
  } else if (!request.body.title) {
    response.status(422).json({
      message: 'Incorrect field type: title'
    });
  } else if (!request.body.folderid) {
    response.status(422).json();
  } else {
    // Handle the two optional bookmark fields. If user did not provide a
    // value use defaults.
    var bdescription = request.body.description ? request.body.description : '';
    var bscreenshot = request.body.screenshot ? request.body.screenshot : 'http://placekitten.com/200/300';

    var client = new pg.Client(queries.CONNECT_URL);
    client.connect(function(err) {
      if (err) {
        console.error(err);
        response.sendStatus('500');
      }

      // Paramitarize query to protect against SQL injection
      client.query(queries.INSERT_BOOKMARK, [request.body.url, request.body.title, bdescription, request.body.folderid, bscreenshot, 1],
        function(err, result) {
          if (err) {
            console.log('inside query');
            console.error(err);
            response.sendStatus('500');
          }
          response.status(201).json(result.rows[0]);

          // disconnect the client
          client.end((err) => {
            if (err) throw err;
          });
        });
    });
  }
});

/**
 * @description `PUT /bookmarks/:bookmarkid` endpoint. Takes an object with the following
 * fields: url, title, description (optional), folderid,
 * screenshot (optional). If update in the database is successful, then the
 * edited bookmark is returned to the caller.
 */

router.put('/:bookmarkid', jsonParser, function (request, response) {
  const bookmarkid = request.params.bookmarkid;
  if (!request.body.url) {
    response.status(422).json({
      message: 'Missing field: URL'
    });
  } else if (!request.body.title) {
    response.status(422).json({
      message: 'Incorrect field type: title'
    });
  } else if (!request.body.folderid) {
    response.status(422).json();
  } else {
    // Handle the two optional bookmark fields. If user did not provide a
    // value use defaults.
    var bdescription = request.body.description ? request.body.description : '';
    var bscreenshot = request.body.screenshot ? request.body.screenshot : 'http://placekitten.com/200/300';
  }
  var client = new pg.Client(queries.CONNECT_URL);
  client.connect(function(err) {
    if (err) {
      response.sendStatus('500');
    }

    // Paramitarize query to protect against SQL injection
    client.query(queries.UPDATE_BOOKMARK, [request.body.url, request.body.title, bdescription, request.body.folderid, bscreenshot, 1, bookmarkid],
      function(err, result) {
        if (err) {
          response.sendStatus('500');
        }
        response.status(200).json(result.rows[0]);

        // disconnect the client
        client.end(function(err) {
          if (err) throw err;
        });
      }
    );
  });
});

/**
 * @description `DELETE /bookmarks/:bookmarkid` endpoint.
 * Takes :bookmarkid and queries the database to delete the matching bookmark
 * If deleting from the database is successful, then the
 * deleted bookmark is returned to the caller.
 */
router.delete('/:bookmarkid', function(request, response) {
  const id = request.params.bookmarkid;
  delBookmarkFolder(id, null).then(function(result) {
    response.json(result.rows);
  }, function(err) {
    response.status('404').json(err);
  });
});

module.exports = router;
