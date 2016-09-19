/* ---- Dependencies ---- */
var pg = require('pg');
var express = require('express');
var bodyParser = require('body-parser');
var queries = require('./db/queries');
var getBookmarks = require('./get_function');
var delBookmarkFolder = require('./delete_function');

/* ---- Initial Setup ---- */
var app = express();
var jsonParser = bodyParser.json();
app.disable('etag');
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Serve the frontend code
app.use(express.static('./public/build/'))

/* ---- GET REQUESTS ---- */
/**
 * @description `GET /bookmarks` enpoint; returns an array of all the
 * bookmarks stored in the database.
 */
app.get('/bookmarks', function(request, response) {
  getBookmarks().then(function(result) {
    response.json(result.rows);
  }, function(err) {
    response.status('404').json(err);
  });
});

/**
 * @description `GET /folder/bookmark/:folderName` endpoint; returns an array of
 * bookmarks with the provided folder name.
 */
app.get('/folder/bookmarks/:folderName', function(request, response) {
  getBookmarks(request.params.folderName).then(function(result) {
    response.json(result.rows);
  }, function(err) {
    response.status('404').json(err);
  });
});

/**
 * @description `GET /tag/bookmark/:tagName` endpoint; returns an array of
 * bookmarks with the provided tag name.
 */
app.get('/tag/bookmarks/:tagName', function(request, response) {
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
app.get('/tags', function(request, response) {
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

/**
 * @description `GET /folders` endpoint; returns an array of
 * folders stored in the database.
 */
app.get('/folders', function(request, response) {
  var client = new pg.Client(queries.CONNECT_URL);
  client.connect(function(err) {
    console.log('client connected');
    if (err) {
      console.error(err);
      response.sendStatus('500');
    }
    client.query(queries.SELECT_FOLDER, function(err, result) {
      if (err) {
        console.error(err);
        response.sendStatus('500');
      }

      // Convert the array of folder objects returned from database
      // into an array of Strings.
      var resultsToReturn = result.rows.map(function(value) {
        return value;
      });

      response.json(resultsToReturn);

      // disconnect the client
      client.end(function(err) {
        if (err) throw err;
      });
    });
  });
});

/* ---- POST REQUESTS ---- */

/**
 * @description `POST /bookmark` endpoint. Takes an object with the following
 * fields: url, title, description (optional), foldername,
 * screenshot (optional). If insert into database is successful, then the
 * new bookmark is returned to the caller.
 */
app.post('/bookmark', jsonParser, function(request, response) {
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
          client.end(function(err) {
            if (err) throw err;
          });
        });
    });
  }
});

/**
 * @description `POST /folder` endpoint. Takes an object with the following
 * field: foldername. If insert into database is successful, then the
 * new folder name is returned to the caller.
 */
app.post('/folder', jsonParser, function(request, response) {
  console.log(request.body.foldername)
  if (!request.body.foldername) {
    response.status(422).json({
      message: 'Missing field: foldername'
    });
  } else {
    var client = new pg.Client(queries.CONNECT_URL);
    client.connect(function(err) {
      console.log('client connected');
      if (err) {
        console.error(err);
        response.sendStatus('500');
      }
      // Paramitarize query to protect against SQL injection
      client.query(queries.INSERT_FOLDER, [request.body.foldername],
        function(err, result) {
          if (err) {
            console.error(err);
            response.sendStatus('500');
          }
          response.json(result.rows[0]);

          // disconnect the client
          client.end(function(err) {
            if (err) throw err;
          });
        });
    });
  }
});

/* ---- PUT REQUESTS ---- */

/**
 * @description `PUT /bookmark/:bookmarkid` endpoint. Takes an object with the following
 * fields: url, title, description (optional), folderid,
 * screenshot (optional). If update in the database is successful, then the
 * edited bookmark is returned to the caller.
 */

app.put('/bookmark/:bookmarkid', jsonParser, function (request, response) {
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
  * @description `PUT /folder/:folderid` endpoint. Takes an object with the following
  * fields: folderid and new foldername. If update in the database
  * is successful, then the edited folder is returned to the caller.
  */

app.put('/folder/:folderid', jsonParser, function (request, response) {
  const folderid = request.params.folderid;
  if (!request.body.foldername) {
    response.status(422).json({
      message: 'Missing field: foldername'
    });
  } else {
    var client = new pg.Client(queries.CONNECT_URL);
    client.connect(function(err) {
      if (err) {
        response.sendStatus('500');
      }
      // Paramitarize query to protect against SQL injection
      client.query(queries.UPDATE_FOLDER, [request.body.foldername, folderid],
        function(err, result) {
          if (err) {
            console.error(err);
            response.sendStatus('500');
          }
          response.json(result.rows[0]);

          // disconnect the client
          client.end(function(err) {
            if (err) throw err;
          });
        });
    });
  }
});

/* ---- DELETE REQUESTS ---- */

/**
 * @description `DELETE /bookmark/:bookmarkid` endpoint.
 * Takes :bookmarkid and queries the database to delete the matching bookmark
 * If deleting from the database is successful, then the
 * deleted bookmark is returned to the caller.
 */
app.delete('/bookmark/:bookmarkid', function(request, response) {
  const id = request.params.bookmarkid;
  delBookmarkFolder(id, null).then(function(result) {
    response.json(result.rows);
  }, function(err) {
    response.status('404').json(err);
  });
});

/**
 * @description `DELETE /folder/:folderid` endpoint.
 * Takes :folderid and queries the database to delete the matching folder
 * If deleting from the database is successful, then the
 * deleted folder is returned to the caller.
 */
app.delete('/folder/:folderid', function(request, response) {
  const folder = request.params.folderid;
  delBookmarkFolder(null, folder).then(function(result) {
    response.json(result.rows);
  }, function(err) {
    response.status('404').json(err);
  });
});


/* ---- Set port and start server ---- */
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
