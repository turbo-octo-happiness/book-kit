const pg = require('pg');
const express = require('express');
const jsonParser = require('body-parser').json();
const queries = require('../db/queries');
const getBookmarks = require('../get_function');
const delBookmarkFolder = require('../delete_function');

const router = express.Router();

/**
 * @description `GET /folder/bookmark/:folderName` endpoint; returns an array of
 * bookmarks with the provided folder name.
 */
// Don't need
router.get('/bookmarks/:folderid', (request, response) => {
  getBookmarks(request.params.folderName).then((result) => {
    response.json(result.rows);
  }, (err) => {
    response.status('404').json(err);
  });
});

/**
 * @description `GET /folders` endpoint; returns an array of
 * folders stored in the database.
 */
// return id and name
router.get('/', (request, response) => {
  const client = new pg.Client(queries.CONNECT_URL);
  client.connect((err) => {
    console.log('client connected');
    if (err) {
      console.error(err);
      response.sendStatus('500');
    }
    client.query(queries.SELECT_FOLDER, (queryErr, result) => {
      if (err) {
        console.error(queryErr);
        response.sendStatus('500');
      }

      // Convert the array of folder objects returned from database
      // into an array of Strings.
      const resultsToReturn = result.rows.map((value) => {
        return value;
      });

      response.json(resultsToReturn);

      // disconnect the client
      client.end((exitErr) => {
        if (exitErr) throw exitErr;
      });
    });
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
    const client = new pg.Client(queries.CONNECT_URL);
    client.connect((err) => {
      console.log('client connected');
      if (err) {
        console.error(err);
        response.sendStatus('500');
      }
      // Paramitarize query to protect against SQL injection
      client.query(queries.INSERT_FOLDER, [request.body.foldername],
        (queryErr, result) => {
          if (err) {
            console.error(queryErr);
            response.sendStatus('500');
          }
          response.json(result.rows[0]);

          // disconnect the client
          client.end((exitErr) => {
            if (exitErr) throw err;
          });
        });
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
    const client = new pg.Client(queries.CONNECT_URL);
    client.connect((err) => {
      if (err) {
        response.sendStatus('500');
      }
      // Paramitarize query to protect against SQL injection
      client.query(queries.UPDATE_FOLDER, [request.body.foldername, request.body.folderid],
        (queryErr, result) => {
          if (err) {
            console.error(err);
            response.sendStatus('500');
          }
          console.log(result.rows);
          response.json(result.rows[0]);

          // disconnect the client
          client.end((exitErr) => {
            if (exitErr) throw err;
          });
        });
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
  const folder = request.params.folderid;
  delBookmarkFolder(null, folder).then((result) => {
    response.json(result.rows);
  }, (err) => {
    response.status('404').json(err);
  });
});

module.exports = router;
