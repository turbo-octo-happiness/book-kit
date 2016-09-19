var chai = require('chai');
var chaiHttp = require('chai-http');
var mocha = require('mocha');
var app = require('../server').app;
var exec = require('child-process').exec;

var should = chai.should();

chai.use(chaiHttp);

function prepare_db(next) {
  exec('createdb testdb', function(err) {
    if (err !== null) {
      console.log('exec error: ' + err);
    }
    exec('psql -d testdb -f test/sqldump.sql', function (err) {
      if (err !== null) {
        console.log('exec error: ' + err);
      }
      next(err);
    });
  });
}

describe('Bookmark Endpoints', function () {
  before(function(done) {
    prepare_db(function(err) {
      if (err) {
        
      }
    })
  });
  after(function(done) {

  });

  it('should return an empty list initially', function(done) {

    done();
  });
});
