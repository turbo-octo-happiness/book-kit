// Where the database is located
exports.CONNECT_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/bookmarks';

/* ---- Postgres Queries Used by the API ---- */
exports.SELECT_TAG = 'SELECT tag FROM tag;';

exports.SELECT_FOLDER = 'SELECT folderid, foldername FROM folder;';

exports.SELECT_BOOKMARK = `SELECT bookmarkid, url, title, description,
                            foldername, folderid, screenshot
                          FROM bookmark NATURAL JOIN folder;`;

exports.SELECT_BOOKMARK_BY_FOLDER = (folder) => {
  return `SELECT bookmarkid, url, title, description, foldername, screenshot
          FROM bookmark NATURAL JOIN folder
          WHERE foldername = '${folder}';`;
};

exports.SELECT_BOOKMARK_BY_TAG = (tag) => {
  return `SELECT bookmark.bookmarkid, url, title, description, foldername, screenshot, tag
          FROM bookmark JOIN bookmark_tags ON bookmark.bookmarkid = bookmark_tags.bookmarkid
          JOIN tag ON bookmark_tags.tagid = tag.tagid
          WHERE bookmark.bookmarkid in (
            SELECT bookmark.bookmarkid
              FROM bookmark JOIN bookmark_tags ON bookmark.bookmarkid = bookmark_tags.bookmarkid
              JOIN tag ON bookmark_tags.tagid = tag.tagid
              WHERE tag.tag = '${tag}');`;
};

exports.INSERT_BOOKMARK = `INSERT INTO bookmark(url, title, description,
                              folderid, screenshot, userid)
                            VALUES ($1, $2, $3, $4, $5, $6)
                            RETURNING bookmarkid, url, title, description, folderid, screenshot;`;

exports.INSERT_FOLDER = `INSERT INTO folder(foldername) VALUES ($1)
                        RETURNING folderid, foldername;`;

exports.DELETE_BOOKMARK = (bookmarkid) => {
  return `DELETE FROM bookmark WHERE bookmarkid = '${bookmarkid}' RETURNING *;`;
};

exports.DELETE_FOLDER = (folderid) => {
  return `DELETE FROM folder WHERE folderid = '${folderid}' RETURNING *;`;
};

exports.UPDATE_BOOKMARK = `UPDATE bookmark SET (url, title, description, folderid, screenshot,
                            userid) = ($1, $2, $3, $4, $5, $6)
                          WHERE bookmarkid = ($7)
                          RETURNING bookmarkid, url, title, description, folderid, screenshot;`;

exports.UPDATE_FOLDER = `UPDATE folder SET foldername = ($1) WHERE folderid = ($2)
                        RETURNING folderid, foldername;`;
