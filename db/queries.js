// Where the database is located
exports.CONNECT_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/bookmarks';

/* ---- Postgres Queries Used by the API ---- */
exports.SELECT_TAG = `SELECT tag
                      FROM tag NATURAL JOIN bookmark_tags NATURAL JOIN bookmark NATURAL JOIN user
                      WHERE customerid = $1;`;

exports.SELECT_FOLDER = `SELECT DISTINCT folderid, foldername
                        FROM folder NATURAL JOIN bookmark NATURAL JOIN customer
                        WHERE customerid = $1;`;

exports.SELECT_BOOKMARK = `SELECT bookmarkid, url, title, description, foldername, folderid,
                            screenshot
                          FROM bookmark NATURAL JOIN folder NATURAL JOIN "customer"
                          WHERE customeridentity = $1;`;

exports.SELECT_BOOKMARK_BY_FOLDER = `SELECT bookmarkid, url, title, description, foldername,
                                      screenshot
                                    FROM bookmark NATURAL JOIN folder
                                    WHERE foldername = $1;`;

exports.SELECT_BOOKMARK_BY_TAG = `SELECT bookmark.bookmarkid, url, title, description, foldername,
                                    screenshot, tag
                                  FROM bookmark JOIN bookmark_tags ON bookmark.bookmarkid =
                                    bookmark_tags.bookmarkid
                                  JOIN tag ON bookmark_tags.tagid = tag.tagid
                                  WHERE bookmark.bookmarkid in (
                                    SELECT bookmark.bookmarkid
                                    FROM bookmark JOIN bookmark_tags ON bookmark.bookmarkid =
                                      bookmark_tags.bookmarkid
                                    JOIN tag ON bookmark_tags.tagid = tag.tagid
                                    WHERE tag.tagid = $1);`;

exports.INSERT_BOOKMARK = `INSERT INTO bookmark(url, title, description,
                              folderid, screenshot, customerid)
                            VALUES ($1, $2, $3, $4, $5, $6)
                            RETURNING bookmarkid, url, title, description, folderid, screenshot;`;

exports.INSERT_FOLDER = `INSERT INTO folder(foldername) VALUES ($1)
                        RETURNING folderid, foldername;`;

exports.DELETE_BOOKMARK = 'DELETE FROM bookmark WHERE bookmarkid = $1 RETURNING *;';


exports.DELETE_FOLDER = 'DELETE FROM folder WHERE folderid = $1 RETURNING *;';

exports.UPDATE_BOOKMARK = `UPDATE bookmark SET (url, title, description, folderid, screenshot,
                            customerid) = ($1, $2, $3, $4, $5, $6)
                          WHERE bookmarkid = ($7)
                          RETURNING bookmarkid, url, title, description, folderid, screenshot;`;

exports.UPDATE_FOLDER = `UPDATE folder SET foldername = ($1) WHERE folderid = ($2)
                        RETURNING folderid, foldername;`;


exports.INSERT_USER = `INSERT INTO customer(customeridentity)
                        values ($1) on conflict (customeridentity) do nothing;`;
