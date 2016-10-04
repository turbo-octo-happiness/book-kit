const express = require('express');
const jsonParser = require('body-parser').json();
const queries = require('../db/queries');
const db = require('../pgp');

const router = express.Router();

/**
 * @description `GET /folders` endpoint. Returns an array of objects containing information about
 * a folder: folderid, foldername, count (i.e. number of customer's associated with a folder),
 * and members (i.e. email addresses of all customers associated with a folder). Folders in the
 * returned array will either be owned by the authenticated customer or be shared with that
 * customer.
 */
router.get('/', (request, response) => {
  // Some user_id's are numbers and some are alphanumeric.
  const userIdentity = `${request.user.identities[0].user_id}`;

  // Paramitarize query to protect against SQL injection
  db.manyOrNone(queries.SELECT_FOLDER, [userIdentity]).then((result) => {
    response.json(result);
  }).catch((error) => {
    console.log('ERROR:', error.message || error);
    response.status(500).send({
      error: 'Database error',
    });
  });
});

/**
 * @description `POST /folders` endpoint. Creates a new folder and assigns ownership of the folder
 * to the authenticated customer. Takes an object with the following
 * field: foldername. If insertion into the database is successful, the new folder name and id is
 * returned to the caller.
 */
router.post('/', jsonParser, (request, response) => {
  // Some user_id's are numbers and some are alphanumeric.
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
        response.status(500).send({
          error: 'Database error',
        });
      });
  }
});

/**
 * @description `POST /folders/customers/:folderid` endpoint. Allows folders to be shared among
 * multiple customers. Requires a folderid as url param and the customer email in the request body.
 */
router.post('/customers/:folderid', jsonParser, (request, response) => {
  // @FIXME: find a way of varifying that a customer adding the new person already has access to
  // the folder.
  // Some user_id's are numbers and some are alphanumeric.
  // const userIdentity = `${request.user.identities[0].user_id}`;
  console.log(request.body, '<<<< SERVER > REQUEST BODY');
  if (!request.body.email) {
    response.status(422).json({
      message: 'Missing field: email',
    });
  } else {
    const email = request.body.email;
    const folderid = request.params.folderid;

    // Database transaction, all queries within will either complete or fail.
    db.tx((t) => {
      return db.one(queries.ADD_USER_TO_FOLDER_BY_EMAIL, [folderid, email, email])
        .then((result) => {
          console.log(`queries.ADD_USER_TO_FOLDER_BY_EMAIL result: ${result}`);
          return db.one(queries.SELECT_FOLDER_INFO, [result.folderid]);
        });
    }).then((data) => {
      console.log('transaction then', data);
      response.status(201).json(data);
    }).catch((error) => {
      let errorMessage = error.message || error;

      if (errorMessage === 'duplicate key value violates unique constraint "user_folder_pkey"') {
        errorMessage = `${email} already has access to ${folderid}`;
      }

      if (errorMessage === 'No data returned from the query.') {
        errorMessage = `${email} does not exist in the database.`;
      }

      console.log('ERROR:', error.message || error);
      response.status(500).send({
        error: errorMessage,
      });
    });
  }
});

/**
 * @description `PUT /folders/:folderid` endpoint. Updates a folder's name. Takes an object with
 * the following fields: foldername. If update is successful, then the edited
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
        response.status(500).send({
          error: 'Database error',
        });
      });
  }
});

/**
 * @description `DELETE /folder/:folderid` endpoint.
 * Attempts to delete the specified folder.
 * Folders can only be deleted if the deleter does not own any bookmarks in the folder.
 * Shared folders are not deleted until the last member has left.
 * If deleting from the database is successful, then the
 * deleted folder is returned to the caller.
 */
router.delete('/:folderid', (request, response) => {
  // Some user_id's are numbers and some are alphanumeric.
  const userIdentity = `${request.user.identities[0].user_id}`;
  const folderid = request.params.folderid;

  db.tx((t) => {
    return t.manyOrNone(queries.CHECK_FOLDER_CONTENT, [folderid, userIdentity])
      .then((result) => {
        // If there are bookmarks owned by this customer in the folder, then
        // delete reject request.
        if (result.length > 0) {
          return Promise.reject({
            message: 'There are still bookmarks in this folder',
          });
        }
        console.log(result);
        return t.one(queries.DELETE_FOLDER_REFERENCE, [folderid, userIdentity])
          .then((data) => {
            return t.oneOrNone(queries.DELETE_FOLDER, [folderid, folderid])
              .then((delFolder) => {
                console.log(`delFolder = ${delFolder}; data = ${data}`)
                const resultsToReturn = delFolder || data;
                return Promise.resolve(resultsToReturn);
              });
          });
      });
  }).then((data) => {
    console.log(data);
    response.json(data);
  }).catch((error) => {
    console.log('ERROR:', error.message || error);
    response.status(500).send({
      error: error.message,
    });
  });
});

module.exports = router;
