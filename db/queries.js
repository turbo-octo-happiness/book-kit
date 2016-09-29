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

// Retrieves both tags associated with bookmarks (i.e. shared bookmarks) and
// tags not associated with a bookmark.
exports.SELECT_TAG = `SELECT tag.tagid, tagname, bookmarkid
                      FROM tag NATURAL JOIN customer
                        LEFT JOIN bookmark_tag ON tag.tagid = bookmark_tag.tagid
                      WHERE customerid = '123';`;

// If tag/customerid pair already exists returns id, else creates new record and
// returns id.
// Source: http://stackoverflow.com/questions/18192570/insert-if-not-exists-else-return-id-in-postgresql
exports.INSERT_TAG = `WITH s AS (
                        SELECT tagid, customerid, tagname
                        FROM tag
                        WHERE customerid = $1 and tagname = $2
                      ),
                      i AS (
                        INSERT INTO tag (customerid, tagname)
                        SELECT $3, $4
                        WHERE NOT EXISTS (SELECT 1 FROM s)
                        RETURNING tagid, customerid, tagname
                      )
                      SELECT tagid, tagname
                      FROM i
                      UNION ALL
                      SELECT tagid, tagname
                      FROM s;`;

exports.INSERT_BOOKMARK_TAG = `INSERT INTO bookmark_tag(bookmarkid, tagid)
                               VALUES ($1, $2)
                               RETURNING tagid;`;

// Only the tag creator can update a tag
exports.UPDATE_TAG = `UPDATE tag SET tagname = ($1)
                      WHERE tagid = ($2) AND customerid = ($3)
                      RETURNING tagid, tagname;`;

// Remove a tag from a bookmark
exports.DELETE_TAG_REFERENCE = `DELETE FROM bookmark_tag
                                WHERE bookmarkid = $1 AND tagid = $2
                                RETURNING *;`;

// Only the tag creator can delete a tag
exports.DELETE_TAG = `DELETE FROM tag
                      WHERE tagid = $1 AND customerid = $2;`;

/*
 ==================================================================================================
                              ____  __   __    ____  ____  ____  ____
                             (  __)/  \ (  )  (    \(  __)(  _ \/ ___)
                              ) _)(  O )/ (_/\ ) D ( ) _)  )   /\___ \
                             (__)  \__/ \____/(____/(____)(__\_)(____/
 ==================================================================================================
*/

exports.SELECT_FOLDERS = `SELECT folderid, foldername, count(customerid) AS count,
                          array_agg(email) AS members
                        FROM folder NATURAL JOIN customer_folder NATURAL JOIN customer
                        GROUP  BY folderid
                        HAVING (
                          SELECT email FROM customer WHERE customerid = $1
                        ) = ANY(array_agg(email));`;

exports.INSERT_FOLDER = `WITH folders AS (
	                         INSERT INTO folder(foldername) VALUES ($1)
                           RETURNING folderid, foldername
                         )
                         INSERT INTO customer_folder(customerid, folderid)
                         VALUES ($2, (SELECT folderid from folders))
                         RETURNING folderid, (SELECT foldername from folders);`;

// Works given the customerid
exports.ADD_USER_TO_FOLDER_BY_ID = `INSERT INTO customer_folder(customerid, folderid)
                                    VALUES ($1, $2) RETURNING customerid, folderid;`;

exports.ADD_USER_TO_FOLDER_BY_EMAIL = `INSERT INTO customer_folder(customerid, folderid)
                                       SELECT customerid, 2 FROM customer
                                       WHERE email = 'magelet13@Gmail.com'
                                       RETURNING customerid, folderid;`;

// Who has the right to delete a folder?
// This query will delete the folder and all references to it in the customer_folder table
exports.DELETE_FOLDER = 'DELETE FROM folder WHERE folderid = $1 RETURNING *;';

// WHo has the right to update folders?
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

exports.SELECT_BOOKMARK = `SELECT bookmark.bookmarkid, url, title, description, foldername,
                            folder.folderid, screenshot, bookmark.customerid AS owner,
                            array_agg(DISTINCT customer_folder.customerid) AS members,
                            array_agg(DISTINCT tag.tagid || ',' || tagname) AS tags
                          FROM bookmark NATURAL JOIN folder RIGHT JOIN customer_folder
                            ON folder.folderid = customer_folder.folderid
                            JOIN customer ON customer_folder.customerid = customer.customerid
                            LEFT JOIN bookmark_tag ON
                            bookmark.bookmarkid = bookmark_tag.bookmarkid LEFT JOIN tag ON
                            bookmark_tag.tagid = tag.tagid
                          GROUP BY bookmark.bookmarkid, folder.folderid
                          HAVING (
                            SELECT customerid FROM customer WHERE customerid = $1
                          ) = ANY(array_agg(customer_folder.customerid));`;

exports.INSERT_BOOKMARK = `INSERT INTO bookmark(url, title, description,
                              folderid, screenshot, customerid)
                            VALUES ($1, $2, $3, $4, $5, $6)
                            RETURNING bookmarkid, url, title, description, folderid, screenshot;`;

exports.DELETE_BOOKMARK = `DELETE FROM bookmark
                           WHERE bookmarkid = $1 AND customerid = $2
                           RETURNING *;`;

// Removed customerid from update, to prevent user's from claiming ownership of other people's
// bookmarks.
// If the editor was not the creator, then we recieve a result of zero row effected.
exports.UPDATE_BOOKMARK = `UPDATE bookmark SET (url, title, description, folderid, screenshot) =
                            ($1, $2, $3, $4, $5)
                          WHERE bookmarkid = ($6) AND customerid = ($7)
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
