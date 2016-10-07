/* eslint-env node, mocha */
const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server').app;
const exec = require('child_process').exec;
const db = require('../../pgp');
const makeSpy = require('./spy');
// Authentication/User information
const customer1 = require('./test-setup').customer1;
const customer1Token = require('./test-setup').customer1Token;
const customer2 = require('./test-setup').customer2;
// const customer2Token = require('./test-setup').customer2Token;

process.env.DEVELOPMENT = 'testing';

const should = chai.should();
chai.use(chaiHttp);

const API_ENDPOINT = '/tags';

describe('/tags endpoints', () => {
  afterEach((done) => {
    // Clear the database by deleting every table and then re-creating them
    exec('psql test_bookmarks < db/bookmarks_schema.sql', (error) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      done(error);
    });
  });

  describe('GET', () => {
    it('Should return an empty list of tags initially', () => {
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

    it('Should return list of tags, each tag has an array of associated bookmarks', () => {
      const folder = {
        foldername: 'test folder',
      };

      const bookmark1 = {
        url: 'test.com',
        title: 'example title',
        description: 'example description',
        screenshot: 'example.png',
        customerid: customer1.user_id,
      };

      const bookmark2 = {
        url: 'test.com',
        title: 'test title',
        description: 'test description',
        screenshot: 'test.png',
        customerid: customer1.user_id,
      };

      const tag = {
        tagname: 'tag1',
      };

      return db.tx((t) => {
        return t.one(`WITH customer AS (
                          INSERT INTO customer(customerid, email)
                          VALUES ('${customer1.user_id}', '${customer1.email}')
                        ),
                        folders AS (
                          INSERT INTO folder(foldername) VALUES ($[foldername])
                          RETURNING folderid, foldername
                         )
                         INSERT INTO customer_folder(customerid, folderid)
                         VALUES ('${customer1.user_id}', (SELECT folderid from folders))
                         RETURNING folderid, (SELECT foldername from folders);`, folder)
              .then((folderResult) => {
                bookmark1.folderid = folderResult.folderid;
                bookmark2.folderid = folderResult.folderid;
                return t.batch([
                  t.none(`INSERT INTO bookmark(url, title, description, folderid, screenshot,
                          customerid)
                         VALUES ($[url], $[title], $[description], $[folderid], $[screenshot],
                          $[customerid]);`,
                    bookmark1),
                  t.none(`INSERT INTO bookmark(url, title, description, folderid, screenshot,
                          customerid)
                         VALUES ($[url], $[title], $[description], $[folderid], $[screenshot],
                          $[customerid]);`,
                    bookmark2),
                ])
                .then(() => {
                  t.batch([
                    t.none(`With t AS (
                            INSERT INTO tag(customerid, tagname)
                            VALUES ('${customer1.user_id}', $[tagname])
                            RETURNING tagid
                           )
                           INSERT INTO bookmark_tag(bookmarkid, tagid)
                           SELECT 1, tagid
                           FROM t;`, tag),
                    t.none(`INSERT INTO bookmark_tag(bookmarkid, tagid)
                           SELECT 2, tagid
                           FROM tag
                           WHERE tagname = $[tagname];`, tag),
                  ]);
                });
              });
      }).then(() => {
        return chai.request(app)
          .get(API_ENDPOINT)
          .set('Authorization', `Bearer ${customer1Token}`)
          .then((res) => {
            res.should.have.status(200);
            res.type.should.equal('application/json');
            res.charset.should.equal('utf-8');
            res.body.should.be.an('array');
            res.body.length.should.equal(1);

            const resTag = res.body[0];
            resTag.should.be.an('object');
            resTag.should.have.property('tagid');
            resTag.tagid.should.be.a('number');
            resTag.tagid.should.equal(1);
            resTag.should.have.property('tagname');
            resTag.tagname.should.be.a('string');
            resTag.tagname.should.equal(tag.tagname);
            resTag.should.have.property('bookmarkid');
            resTag.bookmarkid.should.be.an('array');
            resTag.bookmarkid.length.should.equal(2);
            resTag.bookmarkid[0].should.be.a('number');
            resTag.bookmarkid[0].should.equal(1);
            resTag.bookmarkid[1].should.be.a('number');
            resTag.bookmarkid[1].should.equal(2);
          });
      });
    });

    it('Should return null when tag does not have associated bookmarks', () => {
      const tag = {
        tagname: 'tag1',
      };

      return db.tx((t) => {
        return t.none(`INSERT INTO customer(customerid, email)
                       VALUES ('${customer1.user_id}', '${customer1.email}')`)
              .then(() => {
                t.none(`INSERT INTO tag(customerid, tagname)
                        VALUES ('${customer1.user_id}', $[tagname]);`, tag);
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
            res.body.length.should.equal(1);

            const resTag = res.body[0];
            resTag.should.be.an('object');
            resTag.should.have.property('tagid');
            resTag.tagid.should.be.a('number');
            resTag.tagid.should.equal(1);
            resTag.should.have.property('tagname');
            resTag.tagname.should.be.a('string');
            resTag.tagname.should.equal(tag.tagname);
            resTag.should.have.property('bookmarkid');
            resTag.bookmarkid.should.be.an('array');
            should.not.exist(resTag.bookmarkid[0]);
          });
      });
    });
  });

  describe('POST', () => {
    it('Should create a tag, not associated with a bookmark', () => {
      const message = {
        tagname: 'tag1',
      };

      return db.tx((t) => {
        return t.none(`INSERT INTO customer(customerid, email)
                       VALUES ('${customer1.user_id}', '${customer1.email}')`);
      })
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

            const resTag = res.body;
            resTag.should.have.property('tagid');
            resTag.tagid.should.be.a('number');
            resTag.tagid.should.equal(1);
            resTag.should.have.property('tagname');
            resTag.tagname.should.be.a('string');
            resTag.tagname.should.equal(message.tagname);
          });
      });
    });
  });

  describe('PUT', () => {
    it('Should be able to update a tag', () => {
      const tag = {
        tagname: 'tag1',
      };

      const message = {
        tagname: 'updated tag1',
      };

      return db.tx((t) => {
        return t.none(`INSERT INTO customer(customerid, email)
                       VALUES ('${customer1.user_id}', '${customer1.email}')`)
              .then(() => {
                t.none(`INSERT INTO tag(customerid, tagname)
                        VALUES ('${customer1.user_id}', $[tagname]);`, tag);
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

            const resTag = res.body;
            resTag.should.have.property('tagid');
            resTag.tagid.should.be.a('number');
            resTag.tagid.should.equal(1);
            resTag.should.have.property('tagname');
            resTag.tagname.should.be.a('string');
            resTag.tagname.should.equal(message.tagname);
          });
      });
    });

    it('Should only allow a tag\'s owner to edit', () => {
      const tag = {
        tagname: 'tag1',
      };

      const message = {
        tagname: 'updated tag1',
      };

      const spy = makeSpy();

      return db.tx((t) => {
        return t.batch([
          t.none(`INSERT INTO customer(customerid, email)
                  VALUES ('${customer1.user_id}', '${customer1.email}')`),
          t.none(`INSERT INTO customer(customerid, email)
                  VALUES ('${customer2.user_id}', '${customer2.email}')`),
        ])
        .then(() => {
          t.none(`INSERT INTO tag(customerid, tagname)
                  VALUES ('${customer2.user_id}', $[tagname]);`, tag);
        });
      })
      .then(() => {
        return chai.request(app)
          .put(`${API_ENDPOINT}/1`)
          .set('Authorization', `Bearer ${customer1Token}`)
          .send(message)
          .then(spy)
          .catch((error) => {
            // If the request fails, make sure it contains the expected error
            const res = error.response;
            res.should.have.status(500);
            res.type.should.equal('application/json');
            res.charset.should.equal('utf-8');
            res.body.should.be.an('object');
            res.body.should.have.property('error');
            res.body.error.should.equal('Only a tag\'s owner can edit it.');
          })
          .then(() => {
            // Check that the request didn't succeed
            spy.called.should.be.false;
          });
      });
    });
  });

  describe('DELETE', () => {
    it('Should delete specified tag', () => {
      const tag = {
        tagname: 'tag1',
      };

      return db.tx((t) => {
        return t.none(`INSERT INTO customer(customerid, email)
                       VALUES ('${customer1.user_id}', '${customer1.email}')`)
              .then(() => {
                t.none(`INSERT INTO tag(customerid, tagname)
                        VALUES ('${customer1.user_id}', $[tagname]);`, tag);
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

            const resTag = res.body;
            resTag.should.have.property('tagid');
            resTag.tagid.should.be.a('number');
            resTag.tagid.should.equal(1);
            resTag.should.have.property('tagname');
            resTag.tagname.should.be.a('string');
            resTag.tagname.should.equal(tag.tagname);
          });
      });
    });

    it('Should only allow a tag\'s owner to delete', () => {
      const tag = {
        tagname: 'tag1',
      };

      const spy = makeSpy();

      return db.tx((t) => {
        return t.batch([
          t.none(`INSERT INTO customer(customerid, email)
                  VALUES ('${customer1.user_id}', '${customer1.email}')`),
          t.none(`INSERT INTO customer(customerid, email)
                  VALUES ('${customer2.user_id}', '${customer2.email}')`),
        ])
        .then(() => {
          t.none(`INSERT INTO tag(customerid, tagname)
                  VALUES ('${customer2.user_id}', $[tagname]);`, tag);
        });
      })
      .then(() => {
        return chai.request(app)
          .delete(`${API_ENDPOINT}/1`)
          .set('Authorization', `Bearer ${customer1Token}`)
          .then(spy)
          .catch((error) => {
            // If the request fails, make sure it contains the expected error
            const res = error.response;
            res.should.have.status(500);
            res.type.should.equal('application/json');
            res.charset.should.equal('utf-8');
            res.body.should.be.an('object');
            res.body.should.have.property('error');
            res.body.error.should.equal('Only a tag\'s owner can delete it.');
          })
          .then(() => {
            // Check that the request didn't succeed
            spy.called.should.be.false;
          });
      });
    });
  });
});
