const chai = require('chai');
const chaiHttp = require('chai-http');
const mocha = require('mocha');
const app = require('../../server').app;
const exec = require('child_process').exec;
const db = require('../../pgp');
// Authentication/User information
const customer1 = require('./test_setup').customer1;
const customer2 = require('./test_setup').customer2;
const customer1_token = require('./test_setup').customer1_token;
const customer2_token = require('./test_setup').customer2_token;

process.env.DEVELOPMENT = 'testing';

const should = chai.should();
chai.use(chaiHttp);

const API_ENDPOINT = '/bookmarks';

describe('/bookmarks endpoints', () => {
  afterEach((done) => {
    // Clear the database by deleting every table and then re-creating them
    exec('psql test-bookmarks < db/bookmarks_schema.sql', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      done(error);
    });
  });

  describe('GET', () => {
    it('should return an empty list of bookmarks initially', () => {
      return chai.request(app)
        .get(API_ENDPOINT)
        .set('Authorization', `Bearer ${customer1_token}`)
        .then((res) => {
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
        customerid: customer1.user_id,
        email: customer1.email,
      }

      let bookmark1 = {
        url: 'test.com',
        title: 'example title',
        description: 'example description',
        screenshot: 'example.png',
        customerid: '123',
      }

      let bookmark2 = {
        url: 'test.com',
        title: 'test title',
        description: 'test description',
        screenshot: 'test.png',
        customerid: '123',
      }

      return db.tx((t) => {
        return t.one(`WITH customer AS (
                          INSERT INTO customer(customerid, email)
                          VALUES ($[customerid], $[email])
                        ),
                        folders AS (
                          INSERT INTO folder(foldername) VALUES ($[foldername])
                          RETURNING folderid, foldername
                         )
                         INSERT INTO customer_folder(customerid, folderid)
                         VALUES ($[customerid], (SELECT folderid from folders))
                         RETURNING folderid, (SELECT foldername from folders);`, folder)
          .then((folder) => {
            bookmark1.folderid = folder.folderid;
            bookmark2.folderid = folder.folderid;
            return t.batch([
              t.one(`INSERT INTO bookmark(url, title, description, folderid, screenshot, customerid)
                        VALUES ($[url], $[title], $[description], $[folderid], $[screenshot], $[customerid])
                        RETURNING *;`,
                bookmark1),
              t.one(`INSERT INTO bookmark(url, title, description, folderid, screenshot, customerid)
                        VALUES ($[url], $[title], $[description], $[folderid], $[screenshot], $[customerid])
                        RETURNING *;`,
                bookmark2)
            ]);
          });
      }).then((data) => {
        return chai.request(app)
          .get(API_ENDPOINT)
          .set('Authorization', `Bearer ${customer1_token}`)
          .then((res) => {
            res.should.have.status(200);
            res.type.should.equal('application/json');
            res.charset.should.equal('utf-8');
            res.body.should.be.an('array');
            res.body.length.should.equal(2);

            let bookmark = res.body[0];
            bookmark.should.be.an('object');
            bookmark.should.have.property('bookmarkid');
            bookmark.bookmarkid.should.be.a('number');
            bookmark.bookmarkid.should.equal(1);
            bookmark.should.have.property('url');
            bookmark.url.should.be.a('string');
            bookmark.url.should.equal(bookmark1.url);
            bookmark.should.have.property('title');
            bookmark.title.should.be.an('string');
            bookmark.title.should.equal(bookmark1.title);
            bookmark.should.have.property('description');
            bookmark.description.should.be.an('string');
            bookmark.description.should.equal(bookmark1.description);
            bookmark.should.have.property('screenshot');
            bookmark.screenshot.should.be.an('string');
            bookmark.screenshot.should.equal(bookmark1.screenshot);
            bookmark.should.have.property('owner');
            bookmark.owner.should.be.an('string');
            bookmark.owner.should.equal(bookmark1.customerid);
            bookmark.should.have.property('members');
            bookmark.members.should.be.an('array');
            bookmark.members.length.should.equal(1);
            bookmark.members[0].should.equal(bookmark1.customerid);
            bookmark.should.have.property('foldername');
            bookmark.foldername.should.be.an('string');
            bookmark.foldername.should.equal(folder.foldername);
            bookmark.should.have.property('folderid');
            bookmark.folderid.should.be.an('number');
            bookmark.folderid.should.equal(bookmark1.folderid);
            bookmark.should.have.property('tags');
            // If a bookmark does not have any tags, then it will return null in an array.
            bookmark.tags.should.be.an('array');
            bookmark.tags.length.should.equal(1);
            should.not.exist(bookmark.tags[0]);

            bookmark = res.body[1];
            bookmark.should.be.an('object');
            bookmark.should.have.property('bookmarkid');
            bookmark.bookmarkid.should.be.a('number');
            bookmark.bookmarkid.should.equal(2);
            bookmark.should.have.property('url');
            bookmark.url.should.be.a('string');
            bookmark.url.should.equal(bookmark2.url);
            bookmark.should.have.property('title');
            bookmark.title.should.be.an('string');
            bookmark.title.should.equal(bookmark2.title);
            bookmark.should.have.property('description');
            bookmark.description.should.be.an('string');
            bookmark.description.should.equal(bookmark2.description);
            bookmark.should.have.property('screenshot');
            bookmark.screenshot.should.be.an('string');
            bookmark.screenshot.should.equal(bookmark2.screenshot);
            bookmark.should.have.property('owner');
            bookmark.owner.should.be.an('string');
            bookmark.owner.should.equal(customer1.user_id);
            bookmark.should.have.property('members');
            bookmark.members.should.be.an('array');
            bookmark.members.length.should.equal(1);
            bookmark.members[0].should.equal(customer1.user_id);
            bookmark.should.have.property('foldername');
            bookmark.foldername.should.be.an('string');
            bookmark.foldername.should.equal(folder.foldername);
            bookmark.should.have.property('folderid');
            bookmark.folderid.should.be.an('number');
            bookmark.folderid.should.equal(bookmark2.folderid);
            bookmark.should.have.property('tags');
            // If a bookmark does not have any tags, then it will return null in an array.
            bookmark.tags.should.be.an('array');
            bookmark.tags.length.should.equal(1);
            should.not.exist(bookmark.tags[0]);
          });
      });
    });

    it('Should return a list of bookmarks with tags', () => {
      let folder = {
        foldername: 'test folder',
        customerid: customer1.user_id,
        email: customer1.email,
      }

      let bookmark1 = {
        url: 'test.com',
        title: 'example title',
        description: 'example description',
        screenshot: 'example.png',
        customerid: '123',
      }

      let bookmark2 = {
        url: 'test.com',
        title: 'test title',
        description: 'test description',
        screenshot: 'test.png',
        customerid: '123',
      }

      let tag1 = {
        tagname: 'test tag 1'
      };

      let tag2 = {
        tagname: 'tag 2'
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
          .then((folder) => {
            bookmark1.folderid = folder.folderid;
            bookmark2.folderid = folder.folderid;
            return t.batch([
              t.one(`INSERT INTO bookmark(url, title, description, folderid, screenshot, customerid)
                        VALUES ($[url], $[title], $[description], $[folderid], $[screenshot], $[customerid])
                        RETURNING *;`,
                bookmark1),
              t.one(`INSERT INTO bookmark(url, title, description, folderid, screenshot, customerid)
                        VALUES ($[url], $[title], $[description], $[folderid], $[screenshot], $[customerid])
                        RETURNING *;`,
                bookmark2)
            ]).then(() => {
              // bookmark1 should have two tags and bookmark2 should have 1
              return t.batch([
                t.none(`WITH t AS (
                            INSERT INTO tag (customerid, tagname)
                            SELECT '${customer1.user_id}', $[tagname]
                            RETURNING tagid
                          )
                          INSERT INTO bookmark_tag(bookmarkid, tagid)
                          SELECT 1, tagid FROM (
                            SELECT tagid
                            FROM t) AS s;`, tag1),
                t.none(`INSERT INTO bookmark_tag(bookmarkid, tagid)
                          VALUES (2, 1);`),
                t.none(`WITH t AS (
                            INSERT INTO tag (customerid, tagname)
                            SELECT '${customer1.user_id}', $[tagname]
                            RETURNING tagid
                          )
                          INSERT INTO bookmark_tag(bookmarkid, tagid)
                          SELECT 1, tagid FROM (
                            SELECT tagid
                            FROM t) AS s;`, tag2),
              ]);
            });
          });
      }).then((data) => {
        return chai.request(app)
          .get(API_ENDPOINT)
          .set('Authorization', `Bearer ${customer1_token}`)
          .then((res) => {
            res.should.have.status(200);
            res.type.should.equal('application/json');
            res.charset.should.equal('utf-8');
            res.body.should.be.an('array');
            res.body.length.should.equal(2);

            let bookmark = res.body[0];
            bookmark.should.be.an('object');
            bookmark.should.have.property('bookmarkid');
            bookmark.bookmarkid.should.be.a('number');
            bookmark.bookmarkid.should.equal(1);
            bookmark.should.have.property('url');
            bookmark.url.should.be.a('string');
            bookmark.url.should.equal(bookmark1.url);
            bookmark.should.have.property('title');
            bookmark.title.should.be.an('string');
            bookmark.title.should.equal(bookmark1.title);
            bookmark.should.have.property('description');
            bookmark.description.should.be.an('string');
            bookmark.description.should.equal(bookmark1.description);
            bookmark.should.have.property('screenshot');
            bookmark.screenshot.should.be.an('string');
            bookmark.screenshot.should.equal(bookmark1.screenshot);
            bookmark.should.have.property('owner');
            bookmark.owner.should.be.an('string');
            bookmark.owner.should.equal(bookmark1.customerid);
            bookmark.should.have.property('members');
            bookmark.members.should.be.an('array');
            bookmark.members.length.should.equal(1);
            bookmark.members[0].should.equal(bookmark1.customerid);
            bookmark.should.have.property('foldername');
            bookmark.foldername.should.be.an('string');
            bookmark.foldername.should.equal(folder.foldername);
            bookmark.should.have.property('folderid');
            bookmark.folderid.should.be.an('number');
            bookmark.folderid.should.equal(bookmark1.folderid);
            bookmark.should.have.property('tags');
            bookmark.tags.should.be.an('array');
            bookmark.tags.length.should.equal(2);
            bookmark.tags[0].should.have.property('tagid');
            bookmark.tags[0].tagid.should.be.an('number');
            bookmark.tags[0].tagid.should.equal(1);
            bookmark.tags[0].should.have.property('tagname');
            bookmark.tags[0].tagname.should.be.an('string');
            bookmark.tags[0].tagname.should.equal(tag1.tagname);
            bookmark.tags[1].should.have.property('tagid');
            bookmark.tags[1].tagid.should.be.an('number');
            bookmark.tags[1].tagid.should.equal(2);
            bookmark.tags[1].should.have.property('tagname');
            bookmark.tags[1].tagname.should.be.an('string');
            bookmark.tags[1].tagname.should.equal(tag2.tagname);

            bookmark = res.body[1];
            bookmark.should.be.an('object');
            bookmark.should.have.property('bookmarkid');
            bookmark.bookmarkid.should.be.a('number');
            bookmark.bookmarkid.should.equal(2);
            bookmark.should.have.property('url');
            bookmark.url.should.be.a('string');
            bookmark.url.should.equal(bookmark2.url);
            bookmark.should.have.property('title');
            bookmark.title.should.be.an('string');
            bookmark.title.should.equal(bookmark2.title);
            bookmark.should.have.property('description');
            bookmark.description.should.be.an('string');
            bookmark.description.should.equal(bookmark2.description);
            bookmark.should.have.property('screenshot');
            bookmark.screenshot.should.be.an('string');
            bookmark.screenshot.should.equal(bookmark2.screenshot);
            bookmark.should.have.property('owner');
            bookmark.owner.should.be.an('string');
            bookmark.owner.should.equal(customer1.user_id);
            bookmark.should.have.property('members');
            bookmark.members.should.be.an('array');
            bookmark.members.length.should.equal(1);
            bookmark.members[0].should.equal(customer1.user_id);
            bookmark.should.have.property('foldername');
            bookmark.foldername.should.be.an('string');
            bookmark.foldername.should.equal(folder.foldername);
            bookmark.should.have.property('folderid');
            bookmark.folderid.should.be.an('number');
            bookmark.folderid.should.equal(bookmark2.folderid);
            bookmark.should.have.property('tags');
            bookmark.tags.length.should.equal(1);
            bookmark.tags[0].should.have.property('tagid');
            bookmark.tags[0].tagid.should.be.an('number');
            bookmark.tags[0].tagid.should.equal(1);
            bookmark.tags[0].should.have.property('tagname');
            bookmark.tags[0].tagname.should.be.an('string');
            bookmark.tags[0].tagname.should.equal(tag1.tagname);
          });
      });
    });
  });

  describe('POST', () => {
    it('Should return the new bookmark', () => {
      let folder = {
        foldername: 'test folder',
      }

      let message = {
        url: 'test.com',
        title: 'example title',
        description: 'example description',
        screenshot: 'example.png',
        folderid: 1,
        foldername: 'test folder',
        tags: ['tag']
      };

      return db.one(`WITH customer AS (
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
        .then(() => {
          return chai.request(app)
            .post(API_ENDPOINT)
            .set('Authorization', `Bearer ${customer1_token}`)
            .send(message)
            .then((res) => {
              res.should.have.status(201);
              res.type.should.equal('application/json');
              res.charset.should.equal('utf-8');
              res.body.should.be.an('object');

              let bookmark = res.body;
              bookmark.should.have.property('bookmarkid');
              bookmark.bookmarkid.should.be.a('number');
              bookmark.bookmarkid.should.equal(1);
              bookmark.should.have.property('url');
              bookmark.url.should.be.a('string');
              bookmark.url.should.equal(message.url);
              bookmark.should.have.property('title');
              bookmark.title.should.be.an('string');
              bookmark.title.should.equal(message.title);
              bookmark.should.have.property('description');
              bookmark.description.should.be.an('string');
              bookmark.description.should.equal(message.description);
              bookmark.should.have.property('screenshot');
              bookmark.screenshot.should.be.an('string');
              bookmark.screenshot.should.equal(message.screenshot);
              bookmark.should.have.property('owner');
              bookmark.owner.should.be.an('string');
              bookmark.owner.should.equal(customer1.user_id);
              bookmark.should.have.property('foldername');
              bookmark.foldername.should.be.an('string');
              bookmark.foldername.should.equal(message.foldername);
              bookmark.should.have.property('folderid');
              bookmark.folderid.should.be.an('number');
              bookmark.folderid.should.equal(message.folderid);
              bookmark.members.should.be.an('array');
              bookmark.members.length.should.equal(1);
              bookmark.members[0].should.equal(customer1.user_id);
              bookmark.should.have.property('tags');
              bookmark.tags.should.be.an('array');
              bookmark.tags.length.should.equal(1);
              bookmark.tags[0].should.have.property('tagid');
              bookmark.tags[0].tagid.should.be.an('number');
              bookmark.tags[0].tagid.should.equal(1);
              bookmark.tags[0].should.have.property('tagname');
              bookmark.tags[0].tagname.should.be.an('string');
              bookmark.tags[0].tagname.should.equal(message.tags[0]);
            });
        });
    });
  });

  describe('PUT', () => {
    it('Should update bookmark', () => {
      let folder = {
        foldername: 'test folder',
        customerid: customer1.user_id,
        email: customer1.email,
      };

      let bookmark1 = {
        url: 'test.com',
        title: 'example title',
        description: 'example description',
        screenshot: 'example.png',
        customerid: '123',
      };

      let message = {
        url: 'updated.com',
        title: 'update example title',
        description: 'example description',
        screenshot: 'example.png',
        folderid: 1,
        foldername: 'test folder',
        tags: ['test tag 1', 'update']
      };

      let tag1 = {
        tagname: 'test tag 1'
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
          .then((folder) => {
            bookmark1.folderid = folder.folderid;
            return t.one(`INSERT INTO bookmark(url, title, description, folderid, screenshot, customerid)
                      VALUES ($[url], $[title], $[description], $[folderid], $[screenshot], $[customerid])
                      RETURNING *;`,
                bookmark1)
              .then(() => {
                return t.none(`WITH t AS (
                            INSERT INTO tag (customerid, tagname)
                            SELECT '${customer1.user_id}', $[tagname]
                            RETURNING tagid
                          )
                          INSERT INTO bookmark_tag(bookmarkid, tagid)
                          SELECT 1, tagid FROM (
                            SELECT tagid
                            FROM t) AS s;`, tag1);
              });
          });
      }).then(() => {
        return chai.request(app)
          .put(`${API_ENDPOINT}/1`)
          .set('Authorization', `Bearer ${customer1_token}`)
          .send(message)
          .then((res) => {
            res.should.have.status(200);
            res.type.should.equal('application/json');
            res.charset.should.equal('utf-8');
            res.body.should.be.an('object');

            let bookmark = res.body;
            bookmark.should.have.property('bookmarkid');
            bookmark.bookmarkid.should.be.a('number');
            bookmark.bookmarkid.should.equal(1);
            bookmark.should.have.property('url');
            bookmark.url.should.be.a('string');
            bookmark.url.should.equal(message.url);
            bookmark.should.have.property('title');
            bookmark.title.should.be.an('string');
            bookmark.title.should.equal(message.title);
            bookmark.should.have.property('description');
            bookmark.description.should.be.an('string');
            bookmark.description.should.equal(message.description);
            bookmark.should.have.property('screenshot');
            bookmark.screenshot.should.be.an('string');
            bookmark.screenshot.should.equal(message.screenshot);
            bookmark.should.have.property('owner');
            bookmark.owner.should.be.an('string');
            bookmark.owner.should.equal(customer1.user_id);
            bookmark.should.have.property('foldername');
            bookmark.foldername.should.be.an('string');
            bookmark.foldername.should.equal(message.foldername);
            bookmark.should.have.property('folderid');
            bookmark.folderid.should.be.an('number');
            bookmark.folderid.should.equal(message.folderid);
            bookmark.members.should.be.an('array');
            bookmark.members.length.should.equal(1);
            bookmark.members[0].should.equal(customer1.user_id);
            bookmark.should.have.property('tags');
            bookmark.tags.should.be.an('array');
            bookmark.tags.length.should.equal(2);
            bookmark.tags[0].should.have.property('tagid');
            bookmark.tags[0].tagid.should.be.an('number');
            bookmark.tags[0].tagid.should.equal(1);
            bookmark.tags[0].should.have.property('tagname');
            bookmark.tags[0].tagname.should.be.an('string');
            bookmark.tags[0].tagname.should.equal(message.tags[0]);
            bookmark.tags[1].should.have.property('tagid');
            bookmark.tags[1].tagid.should.be.an('number');
            bookmark.tags[1].tagid.should.equal(2);
            bookmark.tags[1].should.have.property('tagname');
            bookmark.tags[1].tagname.should.be.an('string');
            bookmark.tags[1].tagname.should.equal(message.tags[1]);
          });
      });
    });
  });
});
