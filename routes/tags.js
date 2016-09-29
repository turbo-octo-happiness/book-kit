const express = require('express');
const jsonParser = require('body-parser').json();
const queries = require('../db/queries');
const db = require('../pgp');

const router = express.Router();

/**
 * @description `GET /tags` endpoint; retrieves both tags
 * associated with a bookmark (e.g. shared bookmarks) and
 * tags not associated with a bookmark for the authenticate
 * user.
 */
router.get('/', (request, response) => {
  // const userIdentity = request.user.identities[0].user_id;
  const userIdentity = '123';

  db.manyOrNone(queries.SELECT_TAG, [userIdentity])
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      console.log('ERROR:', error.message || error);
      response.status(500);
    });
});

/**
 * @description `PUT /tags/:tagid` endpoint; updates a user's tagname.
 * Only the tag's creator can edit it; if someone besides the owner of
 * the tag tries it will return 0 results.
*/
router.put('/:tagid', jsonParser, (request, response) => {
  // const userIdentity = request.user.identities[0].user_id;
  const userIdentity = '123';
  const tagid = request.params.tagid;
  if (!request.body.tagname) {
    response.status(422).json({
      message: 'Missing field: tagname',
    });
  } else {
    const tagname = request.body.tagname;

    db.one(queries.UPDATE_TAG, [tagname, tagid, userIdentity])
      .then((result) => {
        response.json(result);
      })
      .catch((error) => {
        console.log('ERROR:', error.message || error);
        response.status(500);
      });
  }
});

/**
 * @description `POST /tags/:tagid` endpoint; creats a new tag for a
 * user. Does not associate it with any bookmarks.
*/
router.post('/', jsonParser, (request, response) => {
  // const userIdentity = request.user.identities[0].user_id;
  const userIdentity = '123';

  if (!request.body.tagname) {
    response.status(422).json({
      message: 'Missing field: tagname',
    });
  } else {
    const tag = request.body.tagname;

    db.one(queries.INSERT_TAG, [userIdentity, tag, userIdentity, tag])
      .then((result) => {
        response.json(result);
      })
      .catch((error) => {
        console.log('ERROR:', error.message || error);
        response.status(500);
      });
  }
});

module.exports = router;
