DROP TABLE IF EXISTS "bookmark_tags" CASCADE;
DROP TABLE IF EXISTS "tag" CASCADE;
DROP TABLE IF EXISTS "bookmark" CASCADE;
DROP TABLE IF EXISTS "folder" CASCADE;
DROP TABLE IF EXISTS "customer" CASCADE;

CREATE TABLE "customer"(
  customerid VARCHAR(50) PRIMARY KEY
);

CREATE TABLE "folder"(
  folderid SERIAL PRIMARY KEY,
  foldername VARCHAR(20) NOT NULL,
  customerid integer REFERENCES "customer" (customerid)
);

CREATE TABLE "bookmark"(
  url VARCHAR(250) NOT NULL,
  title VARCHAR(250) NOT NULL,
  description TEXT DEFAULT '',
  folderid INTEGER REFERENCES "folder" (folderid),
  screenshot VARCHAR(100) DEFAULT 'http://placekitten.com/200/300',
  bookmarkid SERIAL PRIMARY KEY,
  customerid INTEGER REFERENCES "customer" (customerid)
);

CREATE TABLE "tag"(
  tagid SERIAL PRIMARY KEY,
  tag VARCHAR(50) NOT NULL
);

CREATE TABLE "bookmark_tags"(
  bookmarkid INTEGER REFERENCES "bookmark" (bookmarkid),
  tagid INTEGER REFERENCES "tag" (tagid),
  PRIMARY KEY (bookmarkid, tagid)
);
