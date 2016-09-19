// Where the database is located
var CONNECT_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/bookmarks';

/* ---- Postgres Queries Used by the API ---- */
var SELECT_TAG = 'SELECT tag FROM tag;';
var SELECT_FOLDER = 'SELECT folderid, foldername FROM folder;';
var SELECT_BOOKMARK = 'SELECT bookmarkid, url, title, description, foldername, screenshot FROM bookmark NATURAL JOIN folder;';
var SELECT_BOOKMARK_BY_FOLDER = function(folder) {
  return `SELECT bookmarkid, url, title, description, foldername, screenshot
          FROM bookmark NATURAL JOIN folder
          WHERE foldername = '${folder}';`;
};
var SELECT_BOOKMARK_BY_TAG = function(tag) {
  return `SELECT bookmark.bookmarkid , url, title, description, foldername, screenshot, tag
          FROM bookmark JOIN bookmark_tags ON bookmark.bookmarkid = bookmark_tags.bookmarkid
          JOIN tag ON bookmark_tags.tagid = tag.tagid
          WHERE bookmark.bookmarkid in (
            SELECT bookmark.bookmarkid
              FROM bookmark JOIN bookmark_tags ON bookmark.bookmarkid = bookmark_tags.bookmarkid
              JOIN tag ON bookmark_tags.tagid = tag.tagid
              WHERE tag.tag = '${tag}');`;
};
var INSERT_BOOKMARK = `INSERT INTO bookmark(url, title, description, folderid, screenshot, userid)
                       VALUES ($1, $2, $3, $4, $5, $6) RETURNING bookmarkid, url, title, description, folderid, screenshot;`;
var INSERT_FOLDER = 'INSERT INTO folder(foldername) VALUES ($1) RETURNING folderid, foldername;';

var DELETE_BOOKMARK = function(bookmarkid) {
  return `DELETE FROM bookmark WHERE bookmarkid = '${bookmarkid}' RETURNING *;`;
};

var DELETE_FOLDER = function(folderid) {
  return `DELETE FROM folder WHERE folderid = '${folderid}' RETURNING *;`;
};

var UPDATE_BOOKMARK = `UPDATE bookmark SET (url, title, description, folderid, screenshot, userid) = ($1, $2, $3, $4, $5, $6)
                       WHERE bookmarkid = ($7)
                       RETURNING bookmarkid, url, title, description, folderid, screenshot;`;

var UPDATE_FOLDER = 'UPDATE folder SET foldername = ($1) WHERE folderid = ($2) RETURNING folderid, foldername;';

exports.CONNECT_URL = CONNECT_URL;
exports.SELECT_TAG = SELECT_TAG;
exports.SELECT_FOLDER = SELECT_FOLDER;
exports.SELECT_BOOKMARK = SELECT_BOOKMARK;
exports.SELECT_BOOKMARK_BY_FOLDER = SELECT_BOOKMARK_BY_FOLDER;
exports.SELECT_BOOKMARK_BY_TAG = SELECT_BOOKMARK_BY_TAG;
exports.INSERT_BOOKMARK = INSERT_BOOKMARK;
exports.INSERT_FOLDER = INSERT_FOLDER;
exports.DELETE_BOOKMARK = DELETE_BOOKMARK;
exports.DELETE_FOLDER = DELETE_FOLDER;
exports.UPDATE_BOOKMARK = UPDATE_BOOKMARK;
exports.UPDATE_FOLDER = UPDATE_FOLDER;
