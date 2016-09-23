/* ---- Dependencies ---- */
const pg = require('pg');
const queries = require('./db/queries');

module.exports = (query, params) => {
  console.log('dbConnect -->', query)
  return new Promise((resolve, reject) => {
    const client = new pg.Client(queries.CONNECT_URL);

    client.connect((err) => {
      if (err) {
        reject('500');
      }
      console.log('connected for ', query)
      client.query(query, params, (queryErr, result) => {
        console.log('results for ', query, ':', queryErr)
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
