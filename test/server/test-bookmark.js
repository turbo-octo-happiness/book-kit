const chai = require('chai');
const jwt = require('jwt-simple');
const chaiHttp = require('chai-http');
const mocha = require('mocha');
const app = require('../../server').app;
const exec = require('child_process').exec;
const db = require('../pgp');
require('dotenv').config();

const should = chai.should();

chai.use(chaiHttp);

const token = () => {
  const payload = {
    iss: 'https://ericsnell.auth0.com/',
    sub: 'auth0|57e97dbede4a3f3c0395b316',
    aud: '6ElpyE9EazmBox2b9PAWytCnFJQTxBCa',
    email: 'sierragregg@gmail.com',
    email_verified: true,
    identities: [{
      user_id: '57e97dbede4a3f3c0395b316',
      provider: 'auth0',
      connection: 'Username-Password-Authentication',
      isSocial: false,
    }],
  };
  const secret = process.env.AUTH0_SECRET;

  return jwt.encode(payload, secret);
};

describe ('Message endpoints', function() {
  beforeEach((done) => {
    // Clear the database
    return db.tx((t) => {
      t.none(`TRUNCATE TABLE bookmark_tags RESET IDENTITY,
        customer_folder RESET IDENTITY, bookmark RESET IDENTITY,
      DROP TABLE IF EXISTS "tag" CASCADE;
      DROP TABLE IF EXISTS "folder" CASCADE;
      DROP TABLE IF EXISTS "customer" CASCADE;`)
    })
    .then(() => {
      done()
    })
    .catch((error) => {
      console.log('ERROR:', error.message || error);
    });
  });

});
// const prepareDB = (next) => {
//   exec('createdb testdb', (err) => {
//     if (err !== null) {
//       console.log('exec error: ' + err);
//     }
//     exec('psql -d testdb -f test/sqldump.sql', function(err) {
//       if (err !== null) {
//         console.log('exec error: ' + err);
//       }
//       next(err);
//     });
//   });
// };

// describe('Bookmark Endpoints', function() {
//   before(function(done) {
//     prepare_db(function(err) {
//       if (err) {
//
//       }
//     })
//   });
//   after(function(done) {
//
//   });
//
//   it('should return an empty list initially', function(done) {
//
//     done();
//   });
// });
