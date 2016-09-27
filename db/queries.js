// Where the database is located
exports.CONNECT_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/bookmarks';

/* ---- Postgres Queries Used by the API ---- */

/*
 ==================================================================================================
                                     ____  __    ___  ____
                                    (_  _)/ _\  / __)/ ___)
                                      )( /    \( (_ \\___ \
                                     (__)\_/\_/ \___/(____/
 ==================================================================================================
*/
exports.SELECT_TAG = `SELECT tagid, tagname
                      FROM tag NATURAL JOIN bookmark_tags
                        NATURAL JOIN bookmark NATURAL JOIN customer
                      WHERE customerid = $1;`;

exports.INSERT_TAG = `WITH tags AS (
	                       INSERT INTO tag(tagname) VALUES ($1)
                         RETURNING tagid, tagname
                       )
                       INSERT INTO bookmark_tags(bookmarkid, tagid)
                       VALUES ($2, (SELECT tagid from tags))
                       RETURNING tagid, (SELECT tagname from tags);`;

exports.UPDATE_TAG = `UPDATE tag SET tagname = ($1) WHERE tagid = ($2)
                        RETURNING tagid, tagname;`;

/*
 ==================================================================================================
                              ____  __   __    ____  ____  ____  ____
                             (  __)/  \ (  )  (    \(  __)(  _ \/ ___)
                              ) _)(  O )/ (_/\ ) D ( ) _)  )   /\___ \
                             (__)  \__/ \____/(____/(____)(__\_)(____/
 ==================================================================================================
*/

exports.SELECT_FOLDER = `SELECT folderid, foldername
                         FROM folder NATURAL JOIN user_folder NATURAL JOIN customer
                         WHERE customerid = $1;`;

// updated
// Test the RETURNING Clause
exports.INSERT_FOLDER = `WITH folders AS (
	                         INSERT INTO folder(foldername) VALUES ($1)
                           RETURNING folderid, foldername
                         )
                         INSERT INTO user_folder(customerid, folderid)
                         VALUES ($2, (SELECT folderid from folders))
                         RETURNING folderid, (SELECT foldername from folders);`;

exports.DELETE_FOLDER = 'DELETE FROM folder WHERE folderid = $1 RETURNING *;';

exports.UPDATE_FOLDER = `UPDATE folder SET foldername = ($1) WHERE folderid = ($2)
                        RETURNING folderid, foldername;`;

/*
 ==================================================================================================
                              ____   __    __  __ _  _  _   __   ____  __ _
                             (  _ \ /  \  /  \(  / )( \/ ) / _\ (  _ \(  / )
                              ) _ ((  O )(  O ))  ( / \/ \/    \ )   / )  (
                             (____/ \__/  \__/(__\_)\_)(_/\_/\_/(__\_)(__\_)
 ==================================================================================================
*/

exports.SELECT_BOOKMARK = `SELECT DISTINCT bookmarkid, url, title, description, foldername,
                            folderid, screenshot, tagid, tagname
                          FROM bookmark NATURAL JOIN folder NATURAL JOIN user_folder
                            NATURAL JOIN customer NATURAL JOIN bookmark_tags NATURAL JOIN tag
                          WHERE customerid = $1;`;

exports.SELECT_BOOKMARK_BY_FOLDER = `SELECT bookmarkid, url, title, description, foldername,
                                      screenshot
                                    FROM bookmark NATURAL JOIN folder
                                    WHERE foldername = $1 AND customerid = $2;`;

exports.SELECT_BOOKMARK_BY_TAG = `SELECT bookmarkid, url, title, description,
                                    screenshot, tagname
                                  FROM bookmark NATURAL JOIN bookmark_tags
                                  NATURAL JOIN tag
                                  WHERE bookmarkid in (
                                    SELECT bookmarkid
                                    FROM bookmark NATURAL JOIN bookmark_tags
                                    NATURAL JOIN tag
                                    WHERE tagid = $1);`;
// updated
exports.INSERT_BOOKMARK = `INSERT INTO bookmark(url, title, description,
                              folderid, screenshot, customerid)
                            VALUES ($1, $2, $3, $4, $5, $6)
                            RETURNING bookmarkid, url, title, description, folderid, screenshot;`;

exports.DELETE_BOOKMARK = 'DELETE FROM bookmark WHERE bookmarkid = $1 RETURNING *;';

exports.UPDATE_BOOKMARK = `UPDATE bookmark SET (url, title, description, folderid, screenshot,
                            customerid) = ($1, $2, $3, $4, $5, $6)
                          WHERE bookmarkid = ($7)
                          RETURNING bookmarkid, url, title, description, folderid, screenshot;`;

/*
 ==================================================================================================
                                      _  _  ____  ____  ____
                                     / )( \/ ___)(  __)(  _ \
                                     ) \/ (\___ \ ) _)  )   /
                                     \____/(____/(____)(__\_)
 ==================================================================================================
*/

// NOTE: 'on conflict' is specific to Postgres and will not work with other SQL databases.
// changed
exports.INSERT_CUSTOMER = `INSERT INTO customer(customerid, email)
                        VALUES ($1, $2) on conflict (customerid) do nothing
                        RETURNING customerid, email;`;
