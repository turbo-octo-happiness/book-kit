let CONNECT_URL = '';

if (process.env.DEVELOPMENT === 'testing') {
  CONNECT_URL = 'postgres://localhost:5432/test_bookmarks';
} else {
  CONNECT_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/bookmarks';
}

const pgp = require('pg-promise')();

// Heroku's free Postgres database only supports 20 connections,
// so we limit the pool size so we never go reach Heroku's limit.
pgp.pg.defaults.poolSize = 20;
console.log('database is connecting to', CONNECT_URL);
module.exports = pgp(CONNECT_URL);
