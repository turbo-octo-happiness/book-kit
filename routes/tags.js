const express = require('express');
// const jsonParser = require('body-parser').json();
const queries = require('../db/queries');
const db = require('../pgp');

const router = express.Router();

/**
 * @description `GET /tags` endpoint; Retrieves both tags
 * associated with a bookmark (e.g. shared bookmarks) and
 * tags not associated with a bookmark for the authenticate
 * user.
 */
router.get('/', (request, response) => {
  // const userIdentity = request.user.identities[0].user_id;
  const userIdentity = '123';

  db.manyOrNone(queries.SELECT_TAG, [userIdentity]).then((result) => {
    response.json(result);
  }).catch((error) => {
    console.log('ERROR:', error.message || error);
    response.status(500);
  });
});



module.exports = router;
