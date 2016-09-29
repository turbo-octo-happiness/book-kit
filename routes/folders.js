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
    const userIdentity = `${request.user.identities[0].user_id}`;

  // Paramitarize query to protect against SQL injection
  db.manyOrNone(queries.SELECT_FOLDER, [userIdentity]).then((result) => {
    response.json(result);
  }).catch((error) => {
    console.log('ERROR:', error.message || error);
    response.status(500).send({ error: 'Database error' });
  });
});

/**
 * @description `POST /folders` endpoint. Takes an object with the following
 * field: foldername. If insert into database is successful, then the
 * new folder name is returned to the caller.
 */
router.post('/', jsonParser, (request, response) => {
  const userIdentity = `${request.user.identities[0].user_id}`;

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
        response.status(500).send({ error: 'Database error' });
      });
  }
});

/**
 * @description `PUT /folders/customers`
*/
router.post('/customers/:folderid', jsonParser, (request, response) => {
  const userIdentity = `${request.user.identities[0].user_id}`;

  if (!request.body.email) {
    response.status(422).json({
      message: 'Missing field: email',
    });
  } else {
    const email = request.body.email;

    db.one(queries.ADD_USER_TO_FOLDER_BY_EMAIL, [folderid, email])
    .then((result) => {
      response.json(result);
    }).catch((error) => {
      console.log('ERROR:', error.message || error);
      response.status(500).send({ error: 'Database error' });
    });
  }
});

/**
 * @description `PUT /folders/:folderid` endpoint. Takes an object with the following
 * fields: foldername. If update in the database is successful, then the edited
 * folder is returned to the caller. Only non-shared folders can be edited.
 */

router.put('/:folderid', jsonParser, (request, response) => {
  const userIdentity = `${request.user.identities[0].user_id}`;

  const folderid = request.params.folderid;

  if (!request.body.foldername) {
    response.status(422).json({
      message: 'Missing field: foldername',
    });
  } else {
    const foldername = request.body.foldername;

    // Paramitarize query to protect against SQL injection
    db.one(queries.UPDATE_FOLDER, [folderid, foldername, userIdentity, folderid])
      .then((result) => {
        response.json(result);
      })
      .catch((error) => {
        console.log('ERROR:', error.message || error);
        response.status(500).send({ error: 'Database error' });
      });
  }
});

/**
 * @description `DELETE /folder/:folderid` endpoint.
 * Takes :folderid and queries the database to delete the matching folder.
 * Folders can only be deleted if all the deleter has no bookmarks in the folder.
 * Shared folders are not deleted until the last member has left.
 * If deleting from the database is successful, then the
 * deleted folder is returned to the caller.
 */
router.delete('/:folderid', (request, response) => {
  const userIdentity = `${request.user.identities[0].user_id}`;
  const folderid = request.params.folderid;

  db.tx((t) => {
    return t.manyOrNone(queries.CHECK_FOLDER_CONTENT, [folderid, userIdentity])
      .then((result) => {
        // If there are bookmarks owned by this customer in the folder, then
        // delete reject request.
        if (result.length > 0) {
          return Promise.reject({ message: 'There are still bookmarks in this folder' });
        }
        console.log(result)
        return t.one(queries.DELETE_FOLDER_REFERENCE, [folderid, userIdentity])
        .then(() => {
          return t.oneOrNone(queries.DELETE_FOLDER, [folderid, userIdentity])
          .then((delFolder) => {
            return Promise.resolve(delFolder);
          });
        });
      });
  }).then((data) => {
    console.log(data);
    response.json(data);
  }).catch((error) => {
    console.log('ERROR:', error.message || error);
    response.status(500).send({ error: error.message });
  });
});

module.exports = router;
