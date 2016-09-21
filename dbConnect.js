/* ---- Dependencies ---- */
const pg = require('pg');
const queries = require('./db/queries');

module.exports = (query, params) => {
  return new Promise((resolve, reject) => {
    const client = new pg.Client(queries.CONNECT_URL);

    client.connect((err) => {
      if (err) {
        reject('500');
      }

      client.query(query, params, (queryErr, result) => {
        if (queryErr) {
          reject('500');
        }

        // disconnect the client
        client.end((exitErr) => {
          if (exitErr) {
            reject('500');
          }
        });

        resolve(result);
      });
    });
  });
};
