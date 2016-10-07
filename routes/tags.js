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
  // Some user_id's are numbers and some are alphanumeric.
  const userIdentity = `${request.user.identities[0].user_id}`;

  db.manyOrNone(queries.SELECT_TAG, [userIdentity])
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      console.error('ERROR:', error.message || error);
      response.status(500);
    });
});

/**
 * @description `POST /tags` endpoint. Creates a new tag for a
 * user. Does not associate it with any bookmarks.
 */
router.post('/', jsonParser, (request, response) => {
  // Some user_id's are numbers and some are alphanumeric.
  const userIdentity = `${request.user.identities[0].user_id}`;

  if (!request.body.tagname) {
    response.status(422).json({
      message: 'Missing field: tagname',
    });
  } else {
    const tag = request.body.tagname;

    db.one(queries.INSERT_TAG, [userIdentity, tag, userIdentity, tag])
      .then((result) => {
        response.status(201).json(result);
      })
      .catch((error) => {
        console.error('ERROR:', error.message || error);
        response.status(500);
      });
  }
});

/**
 * @description `PUT /tags/:tagid` endpoint. Updates a user's tagname.
 * Only the tag's creator can edit it; if someone besides the owner of
 * the tag tries it will return an error.
 */
router.put('/:tagid', jsonParser, (request, response) => {
  // Some user_id's are numbers and some are alphanumeric.
  const userIdentity = `${request.user.identities[0].user_id}`;

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
        let errorMessage = error.message || error;

        if (errorMessage === 'No data returned from the query.') {
          errorMessage = 'Only a tag\'s owner can edit it.';
        }

        console.error('ERROR:', errorMessage);
        response.status(500).send({
          error: errorMessage,
        });
      });
  }
});

/**
 * @description `DELETE /tags/:tagid` endpoint. Deletes specified tag; will also remove the tag
 * from any associated bookmarks.
 */
router.delete('/:tagid', jsonParser, (request, response) => {
  // Some user_id's are numbers and some are alphanumeric.
  const userIdentity = `${request.user.identities[0].user_id}`;

  const tagid = request.params.tagid;

  db.one(queries.DELETE_TAG, [tagid, userIdentity])
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      let errorMessage = error.message || error;

      if (errorMessage === 'No data returned from the query.') {
        errorMessage = 'Only a tag\'s owner can delete it.';
      }

      console.error('ERROR:', errorMessage);
      response.status(500).send({
        error: errorMessage,
      });
    });
});

module.exports = router;
