DROP TABLE IF EXISTS "bookmark_tags" CASCADE;
DROP TABLE IF EXISTS "tag" CASCADE;
DROP TABLE IF EXISTS "user_folder" CASCADE;
DROP TABLE IF EXISTS "bookmark" CASCADE;
DROP TABLE IF EXISTS "folder" CASCADE;
DROP TABLE IF EXISTS "customer" CASCADE;

CREATE TABLE "customer"(
  customerid INTEGER PRIMARY KEY,
  email VARCHAR(100) NOT NULL
);

CREATE TABLE "folder"(
  folderid SERIAL PRIMARY KEY,
  foldername VARCHAR(100) NOT NULL
);

CREATE TABLE "user_folder"(
  customerid INTEGER REFERENCES "customer" (customerid),
  folderid INTEGER REFERENCES "folder" (folderid),
  PRIMARY KEY (customerid, folderid)
);

CREATE TABLE "bookmark"(
  url VARCHAR(500) NOT NULL,
  title VARCHAR(500) NOT NULL,
  description TEXT DEFAULT '',
  folderid INTEGER REFERENCES "folder" (folderid),
  screenshot VARCHAR(500) DEFAULT 'http://placekitten.com/200/300',
  bookmarkid SERIAL PRIMARY KEY,
  customerid INTEGER REFERENCES "customer" (customerid)
);

CREATE TABLE "tag"(
  tagid SERIAL PRIMARY KEY,
  tagname VARCHAR(100) NOT NULL
);

CREATE TABLE "bookmark_tags"(
  bookmarkid INTEGER REFERENCES "bookmark" (bookmarkid),
  tagid INTEGER REFERENCES "tag" (tagid),
  PRIMARY KEY (bookmarkid, tagid)
);
