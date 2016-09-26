/* ---- Dependencies ---- */
const pg = require('pg');
const queries = require('./db/queries');

module.exports = (query, params) => {
  console.log('dbConnect -->', query)
  console.log('params --->', params);
  return new Promise((resolve, reject) => {
    const client = new pg.Client(queries.CONNECT_URL);

    client.connect((err) => {
      if (err) {
        reject('500');
      }
      console.log('connected for ', query)
      client.query(query, params, (queryErr, result) => {
        if (queryErr) {
          reject('500');
        }

        // disconnect the client
        client.end((exitErr) => {
          console.log(typeof exitErr !== 'undefined', '<<<<< ERROR');
          if (typeof exitErr !== 'undefined') {
            reject('500');
          }

          console.log(result);

          resolve(result);
        });

        // console.log('results being returned -->', result.rows)
        console.log(result, '<<<<< RESULT');

      });
    });
  });
};
