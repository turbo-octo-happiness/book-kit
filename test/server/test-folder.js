/* eslint-env node, mocha */
const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server').app;
const exec = require('child_process').exec;
const db = require('../../pgp');
// Authentication/User information
const customer1 = require('./test-setup').customer1;
const customer1Token = require('./test-setup').customer1Token;
const customer2 = require('./test-setup').customer2;
// const customer2Token = require('./test-setup').customer2Token;

process.env.DEVELOPMENT = 'testing';

const should = chai.should();
chai.use(chaiHttp);

const API_ENDPOINT = '/folders';

describe('/folders endpoints', () => {
  afterEach((done) => {
    // Clear the database by deleting every table and then re-creating them
    exec('psql test-bookmarks < db/bookmarks_schema.sql', (error) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      done(error);
    });
  });

  describe('GET', () => {
    it('Should return an empty list of folders initially', () => {
      return chai.request(app)
        .get(API_ENDPOINT)
        .set('Authorization', `Bearer ${customer1Token}`)
        .then((res) => {
          res.should.have.status(200);
          res.type.should.equal('application/json');
          res.charset.should.equal('utf-8');
          res.body.should.be.an('array');
          res.body.length.should.equal(0);
        });
    });

    it('Should return an array of folders', () => {
      const folder1 = {
        foldername: 'test 1',
      };

      const folder2 = {
        foldername: 'test 2',
      };

      return db.tx((t) => {
        return t.none(`INSERT INTO customer(customerid, email)
                       VALUES ('${customer1.user_id}', '${customer1.email}');`)
            .then(() => {
              t.batch([
                t.none(`WITH folders AS (
                                   INSERT INTO folder(foldername) VALUES ($[foldername])
                                   RETURNING folderid, foldername
                                   )
                                   INSERT INTO customer_folder(customerid, folderid)
                                   VALUES ('${customer1.user_id}',
                                    (SELECT folderid from folders));`, folder1),
                t.none(`WITH folders AS (
                                   INSERT INTO folder(foldername) VALUES ($[foldername])
                                   RETURNING folderid, foldername
                                   )
                                   INSERT INTO customer_folder(customerid, folderid)
                                   VALUES ('${customer1.user_id}',
                                    (SELECT folderid from folders));`, folder2),
              ]);
            });
      })
        .then(() => {
          return chai.request(app)
            .get(API_ENDPOINT)
            .set('Authorization', `Bearer ${customer1Token}`)
            .then((res) => {
              res.should.have.status(200);
              res.type.should.equal('application/json');
              res.charset.should.equal('utf-8');
              res.body.should.be.an('array');
              res.body.length.should.equal(2);

              const folder = res.body;
              folder[0].should.be.an('object');
              folder[0].should.have.property('folderid');
              folder[0].folderid.should.be.a('number');
              folder[0].folderid.should.equal(1);
              folder[0].should.have.property('foldername');
              folder[0].foldername.should.be.a('string');
              folder[0].foldername.should.equal(folder1.foldername);
              folder[0].should.have.property('count');
              folder[0].count.should.be.a('string');
              folder[0].count.should.equal('1');
              folder[0].should.have.property('members');
              folder[0].members.should.be.a('array');
              folder[0].members.length.should.equal(1);
              folder[0].members[0].should.equal(customer1.email);

              folder[1].should.be.an('object');
              folder[1].should.have.property('folderid');
              folder[1].folderid.should.be.a('number');
              folder[1].folderid.should.equal(2);
              folder[1].should.have.property('foldername');
              folder[1].foldername.should.be.a('string');
              folder[1].foldername.should.equal(folder2.foldername);
              folder[1].should.have.property('count');
              folder[1].count.should.be.a('string');
              folder[1].count.should.equal('1');
              folder[1].should.have.property('members');
              folder[1].members.should.be.a('array');
              folder[1].members.length.should.equal(1);
              folder[1].members[0].should.equal(customer1.email);
            });
        });
    });
  });

  describe('POST', () => {
    it('Should create a new folder', () => {
      const message = {
        foldername: 'new folder',
      };

      return db.none(`INSERT INTO customer(customerid, email)
                     VALUES ('${customer1.user_id}', '${customer1.email}');`)
        .then(() => {
          return chai.request(app)
            .post(API_ENDPOINT)
            .set('Authorization', `Bearer ${customer1Token}`)
            .send(message)
            .then((res) => {
              res.should.have.status(201);
              res.type.should.equal('application/json');
              res.charset.should.equal('utf-8');
              res.body.should.be.an('object');

              const folder = res.body;
              folder.should.have.property('folderid');
              folder.folderid.should.be.a('number');
              folder.folderid.should.equal(1);
              folder.should.have.property('foldername');
              folder.foldername.should.be.a('string');
              folder.foldername.should.equal(message.foldername);
              folder.should.have.property('count');
              folder.count.should.be.a('string');
              folder.count.should.equal('1');
              folder.should.have.property('members');
              folder.members.should.be.a('array');
              folder.members.length.should.equal(1);
              folder.members[0].should.equal(customer1.email);
            });
        });
    });

    it('Should allow folders to be shared', () => {
      const folder = {
        foldername: 'shared',
      };

      const message = {
        email: customer2.email,
      };

      return db.tx((t) => {
        return t.batch([
          t.none(`INSERT INTO customer(customerid, email)
                  VALUES ('${customer1.user_id}', '${customer1.email}');`),
          t.none(`INSERT INTO customer(customerid, email)
                  VALUES ('${customer2.user_id}', '${customer2.email}');`),
        ]).then(() => {
          return t.none(`WITH folders AS (
                    INSERT INTO folder(foldername)
                    VALUES ($[foldername])
                    RETURNING folderid, foldername
                  )
                  INSERT INTO customer_folder(customerid, folderid)
                  VALUES ('${customer1.user_id}', (SELECT folderid from folders));`, folder);
        });
      }).then(() => {
        return chai.request(app)
          .post(`${API_ENDPOINT}/customers/1`)
          .set('Authorization', `Bearer ${customer1Token}`)
          .send(message)
          .then((res) => {
            res.should.have.status(201);
            res.type.should.equal('application/json');
            res.charset.should.equal('utf-8');
            res.body.should.be.an('object');

            const resFolder = res.body;
            resFolder.should.have.property('folderid');
            resFolder.folderid.should.be.a('number');
            resFolder.folderid.should.equal(1);
            resFolder.should.have.property('foldername');
            resFolder.foldername.should.be.a('string');
            resFolder.foldername.should.equal(folder.foldername);
            resFolder.should.have.property('count');
            resFolder.count.should.be.a('string');
            resFolder.count.should.equal('2');
            resFolder.should.have.property('members');
            resFolder.members.should.be.a('array');
            resFolder.members.length.should.equal(2);
            resFolder.members[0].should.be.a('string');
            resFolder.members[0].should.equal(customer1.email);
            resFolder.members[1].should.be.a('string');
            resFolder.members[1].should.equal(customer2.email);
          });
      });
    });
  });

  describe('PUT', () => {
    it('Should update folder', () => {
      const folder = {
        foldername: 'test 1',
      };

      const message = {
        foldername: 'update test',
      };

      return db.tx((t) => {
        return t.none(`INSERT INTO customer(customerid, email)
                       VALUES ('${customer1.user_id}', '${customer1.email}');`)
            .then(() => {
              return t.none(`WITH folders AS (
                        INSERT INTO folder(foldername)
                        VALUES ($[foldername])
                        RETURNING folderid, foldername
                      )
                      INSERT INTO customer_folder(customerid, folderid)
                      VALUES ('${customer1.user_id}', (SELECT folderid from folders));`, folder);
            });
      })
        .then(() => {
          return chai.request(app)
            .put(`${API_ENDPOINT}/1`)
            .set('Authorization', `Bearer ${customer1Token}`)
            .send(message)
            .then((res) => {
              res.should.have.status(200);
              res.type.should.equal('application/json');
              res.charset.should.equal('utf-8');
              res.body.should.be.an('object');

              const resFolder = res.body;
              resFolder.should.have.property('folderid');
              resFolder.folderid.should.be.a('number');
              resFolder.folderid.should.equal(1);
              resFolder.should.have.property('foldername');
              resFolder.foldername.should.be.a('string');
              resFolder.foldername.should.equal(message.foldername);
              resFolder.should.have.property('count');
              resFolder.count.should.be.a('string');
              resFolder.count.should.equal('1');
              resFolder.should.have.property('members');
              resFolder.members.should.be.a('array');
              resFolder.members.length.should.equal(1);
              resFolder.members[0].should.equal(customer1.email);
            });
        });
    });
  });

  describe('DELETE', () => {
    it('Should remove the folder', () => {
      const folder = {
        foldername: 'test 1',
      };

      return db.tx((t) => {
        return t.none(`INSERT INTO customer(customerid, email)
                       VALUES ('${customer1.user_id}', '${customer1.email}');`)
            .then(() => {
              return t.none(`WITH folders AS (
                        INSERT INTO folder(foldername)
                        VALUES ($[foldername])
                        RETURNING folderid, foldername
                      )
                      INSERT INTO customer_folder(customerid, folderid)
                      VALUES ('${customer1.user_id}', (SELECT folderid from folders));`, folder);
            });
      })
        .then(() => {
          return chai.request(app)
            .delete(`${API_ENDPOINT}/1`)
            .set('Authorization', `Bearer ${customer1Token}`)
            .then((res) => {
              res.should.have.status(200);
              res.type.should.equal('application/json');
              res.charset.should.equal('utf-8');
              res.body.should.be.an('object');

              const resFolder = res.body;
              resFolder.should.have.property('folderid');
              resFolder.folderid.should.be.a('number');
              resFolder.folderid.should.equal(1);
              resFolder.should.have.property('foldername');
              resFolder.foldername.should.be.a('string');
              resFolder.foldername.should.equal(folder.foldername);
            });
        });
    });
  });
});
