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
exports.SELECT_TAG = `SELECT tag.tagid, tagname, array_agg(bookmarkid) AS bookmarkid
                      FROM tag NATURAL JOIN customer
                        LEFT JOIN bookmark_tag ON tag.tagid = bookmark_tag.tagid
                      WHERE customerid = $1
                      GROUP BY tag.tagid;`;

exports.SELECT_TAG_FOR_BOOKMARK = `SELECT tagid, tagname
                                   FROM tag NATURAL JOIN customer NATURAL JOIN bookmark_tag
                                   WHERE customerid = $1 AND bookmarkid = $2;`;

// Return an array of tagnames associated with a given customer and bookmark.
exports.SELECT_TAGNAME = `SELECT array_agg(tagname) AS tagarray
                          FROM tag NATURAL JOIN customer NATURAL JOIN bookmark_tag
                          WHERE customerid = $1 AND bookmarkid = $2
                          GROUP BY customerid;`;

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

exports.INSERT_FULL_TAG = `WITH sel AS (
	                           SELECT tagid, customerid, tagname
	                           FROM tag
	                           WHERE customerid = $1 and tagname = $2
                           ),
                           ins AS (
	                           INSERT INTO tag (customerid, tagname)
	                           SELECT $3, $4
	                           WHERE NOT EXISTS (SELECT 1 FROM sel)
	                           RETURNING tagid, tagname
                           ),
                           joinInsert AS (
	                           INSERT INTO bookmark_tag(bookmarkid, tagid)
	                           SELECT $5, tagid FROM (
                               SELECT tagid
                               FROM ins
                               UNION ALL
                               SELECT tagid
                               FROM sel
                             ) AS si
                           )
                           SELECT tagid, tagname
                           FROM ins
                           UNION ALL
                           SELECT tagid, tagname
                           FROM sel;`;

exports.INSERT_BOOKMARK_TAG = `INSERT INTO bookmark_tag(bookmarkid, tagid)
                               VALUES ($1, $2)
                               RETURNING tagid;`;

// Only the tag creator can update a tag
// This will only be used to update tag name from dashboard, not when bookmarks are updated.
exports.UPDATE_TAG = `UPDATE tag SET tagname = ($1)
                      WHERE tagid = ($2) AND customerid = ($3)
                      RETURNING tagid, tagname;`;

// Remove a tag from a bookmark
exports.DELETE_TAG_REFERENCE = `DELETE FROM bookmark_tag USING tag
                                WHERE bookmark_tag.tagid = tag.tagid
                                  AND bookmarkid = $1 AND tagname = $2;`;

exports.DELETE_TAG_REFERENCE_RETURN = `DELETE FROM bookmark_tag USING tag
                                       WHERE bookmark_tag.tagid = tag.tagid
                                        AND bookmarkid = $1 AND tagname = $2
                                       RETURNING *;`;

// Only the tag creator can delete a tag
exports.DELETE_TAG = `DELETE FROM tag
                      WHERE tagid = $1 AND customerid = $2
                      RETURNING *;`;

/*
 ==================================================================================================
                              ____  __   __    ____  ____  ____  ____
                             (  __)/  \ (  )  (    \(  __)(  _ \/ ___)
                              ) _)(  O )/ (_/\ ) D ( ) _)  )   /\___ \
                             (__)  \__/ \____/(____/(____)(__\_)(____/
 ==================================================================================================
*/

exports.SELECT_FOLDER = `SELECT folderid, foldername, count(customerid) AS count,
                          array_agg(email) AS members
                        FROM folder NATURAL JOIN customer_folder NATURAL JOIN customer
                        GROUP  BY folderid
                        HAVING (
                          SELECT email FROM customer WHERE customerid = $1
                        ) = ANY(array_agg(email));`;

exports.SELECT_FOLDER_INFO = `SELECT folderid, foldername, count(customerid) AS count,
                                array_agg(email) AS members
                              FROM folder NATURAL JOIN customer_folder NATURAL JOIN customer
                              WHERE folderid = $1
                              GROUP  BY folderid;`;

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
                                       SELECT customerid, $1 FROM customer
                                       WHERE email = $2
                                       RETURNING $3 AS email, folderid;`;

// Deleteing a folder requires multiple queries.
// 1. Check that the user who is deleting the folder does not own any bookmarks in the folder.
// params: [folderid, customerid]
exports.CHECK_FOLDER_CONTENT = `SELECT bookmarkid
                                FROM customer_folder NATURAL JOIN folder NATURAL JOIN bookmark
                                WHERE folderid = $1 AND bookmark.customerid = $2;`;

// 2. Remove entry in customer_folder, effectively removing folder from user's view.
// params: [folderid, customerid]
exports.DELETE_FOLDER_REFERENCE = `DELETE FROM customer_folder
                                   WHERE folderid = $1 AND customerid = $2
                                   RETURNING *;`;

// 3. Attempt to remove the folder from the folder table. If people are still associated with the
// the folder, then nothing will happen.
exports.DELETE_FOLDER = `DELETE FROM folder
                        WHERE folderid = $1 AND NOT EXISTS (
                          SELECT folderid
                          FROM customer_folder
                          WHERE folderid = $2
                        )
                        RETURNING *;`;

// Non-shared folders can be updated, but shared folders cannot be changed
// param: [folderid, foldername, customerid, folderid]
exports.UPDATE_FOLDER = `WITH count AS (
	                         SELECT count(customerid)
                           FROM customer_folder
                           WHERE folderid = $1
                        )
                        UPDATE folder SET foldername = $2
                        FROM customer_folder
                        WHERE customer_folder.folderid = folder.folderid
                         AND customer_folder.customerid = $3
                         AND folder.folderid = $4
                         AND (SELECT * FROM count) = 1
                        RETURNING folder.folderid, foldername;`;

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
                          WHERE bookmark.bookmarkid IS NOT NULL
                          GROUP BY bookmark.bookmarkid, folder.folderid
                          HAVING (
                            SELECT customerid FROM customer WHERE customerid = $1
                          ) = ANY(array_agg(customer_folder.customerid));`;

exports.INSERT_BOOKMARK = `INSERT INTO bookmark(url, title, description,
                              folderid, screenshot, customerid)
                            VALUES ($1, $2, $3, $4, $5, $6)
                            RETURNING bookmarkid, url, title, description, folderid, screenshot,
                            customerid AS owner, (
                              SELECT foldername
                              FROM folder
                              WHERE folderid = $7
                            );`;

exports.DELETE_BOOKMARK = `DELETE FROM bookmark
                           WHERE bookmarkid = $1 AND customerid = $2
                           RETURNING *;`;

// Removed customerid from update, to prevent user's from claiming ownership of other people's
// bookmarks.
// If the editor was not the creator, then we recieve a result of zero row effected.
exports.UPDATE_BOOKMARK = `UPDATE bookmark SET (url, title, description, folderid, screenshot) =
                            ($1, $2, $3, $4, $5)
                           WHERE bookmarkid = $6 AND customerid = $7
                           RETURNING *, $8 AS owner, (
                             SELECT foldername
                             FROM folder
                             WHERE folderid = $9);`;

// Copies bookmark to a new folder, iff customer already has access to that folder.
// params: [bookmarkid, customerid]
exports.COPY_BOOKMARK = `SELECT url, title, description, folder.folderid,
                          screenshot, customer_folder.customerid
                         FROM bookmark RIGHT JOIN folder ON bookmark.folderid = folder.folderid
                          JOIN customer_folder ON folder.folderid = customer_folder.folderid
                         WHERE bookmarkid = $1 AND customer_folder.customerid = ANY(
                            SELECT customerid
                            FROM customer_folder
                            WHERE customerid = $2);`;

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
