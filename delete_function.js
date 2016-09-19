/* ---- Dependencies ---- */
var pg = require('pg');
var queries = require('./db/queries.js');

module.exports = function(bookmarkid, folderid) {
  console.log('inside delBookmarkFolder', bookmarkid);
  var query;
  if (bookmarkid) {
    query = queries.DELETE_BOOKMARK(bookmarkid);
  }
  if (folderid) {
    query = queries.DELETE_FOLDER(folderid);
    // @TODO: create an array of tags for each bookmark
  }

  console.log('CONNECT_URL: ', queries.CONNECT_URL);
  return new Promise(function(resolve, reject) {
    var client = new pg.Client(queries.CONNECT_URL);
    client.connect(function(err) {
      console.log('client connected');
      if (err) {
        console.error(err);
        response.sendStatus('500');
      }
      client.query(query, function(err, result) {
        // console.log('query results: ', result);
        if (err) {
          console.error(err);
          response.sendStatus('500');
        }

        // disconnect the client
        client.end(function(err) {
          if (err) throw err;
        });
        resolve(result);
      });
    });
  });
};
