const chai = require('chai');
const jwt = require('jwt-simple');
const chaiHttp = require('chai-http');
const mocha = require('mocha');
const app = require('../../server').app;
const exec = require('child_process').exec;
const db = require('../../pgp');
require('dotenv').config();

process.env.DEVELOPMENT = 'testing';

const should = chai.should();

chai.use(chaiHttp);

const token = (() => {
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

  const secret = new Buffer(process.env.AUTH0_SECRET, 'base64');

  return jwt.encode(payload, secret);
})();

describe('Message endpoints', () => {
  afterEach((done) => {
    console.log('after each')
      // Clear the database
    exec('psql test-bookmarks < db/bookmarks_schema.sql', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      done(error);
    });
  });

  describe('/bookmarks', () => {
    describe('GET', () => {
      it('should return an empty list of bookmarks initially', () => {
        return chai.request(app)
          .get('/bookmarks')
          .set('Authorization', `Bearer ${token}`)
          .then((res) => {
            console.log(`res ==> ${res}`)
            res.should.have.status(200);
            res.type.should.equal('application/json');
            res.charset.should.equal('utf-8');
            res.body.should.be.an('array');
            res.body.length.should.equal(0);
          });
      });

      it('should return a list of bookmarks', () => {
        let folder = {
          foldername: 'test folder',
          customerid: '57e97dbede4a3f3c0395b316',
        }

        let bookmark1 = {
          url: 'test.com',
          title: 'example title',
          description: 'example description',
          screenshot: 'example.png',
          customerid: '57e97dbede4a3f3c0395b316',
        }

        let bookmark2 = {
          url: 'test.com',
          title: 'test title',
          description: 'test description',
          screenshot: 'test.png',
          customerid: '57e97dbede4a3f3c0395b316',
        }

        return db.tx((t) => {
          return t.one(`WITH customer AS (
                          INSERT INTO customer(customerid, email)
                          VALUES ($[customerid], 'test@email.com')
                        ),
                        folders AS (
                          INSERT INTO folder(foldername) VALUES ($[foldername])
                          RETURNING folderid, foldername
                         )
                         INSERT INTO customer_folder(customerid, folderid)
                         VALUES ($[customerid], (SELECT folderid from folders))
                         RETURNING folderid, (SELECT foldername from folders);`, folder)
            .then((folder) => {
              console.log('folder -->', folder)
              bookmark1.folderid = folder.folderid;
              bookmark2.folderid = folder.folderid;
              return t.batch([
                t.none(`INSERT INTO bookmark(url, title, description, folderid, screenshot, customerid)
                              VALUES ($[url], $[title], $[description], $[folderid], $[screenshot], $[customerid])`,
                  bookmark1),
                t.none(`INSERT INTO bookmark(url, title, description, folderid, screenshot, customerid)
                              VALUES ($[url], $[title], $[description], $[folderid], $[screenshot], $[customerid])`,
                  bookmark2),
              ]);
            });
        }).then(() => {
          return chai.request(app)
            .get('/bookmarks')
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
              console.log(`res ==> ${res}`)
              res.should.have.status(200);
              res.type.should.equal('application/json');
              res.charset.should.equal('utf-8');
              res.body.should.be.an('array');
              res.body.length.should.equal(2);
            });
        }).catch((error) => {
          console.log('ERROR:', error.message || error);
        });
      });
    });
  });
});
