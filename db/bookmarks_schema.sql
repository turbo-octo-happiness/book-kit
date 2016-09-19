DROP TABLE IF EXISTS "bookmark_tags";
DROP TABLE IF EXISTS "tag";
DROP TABLE IF EXISTS "bookmark";
DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS "folder";

CREATE TABLE "folder"(
  folderid SERIAL PRIMARY KEY,
  foldername VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE "user"(
  userid SERIAL PRIMARY KEY,
  username VARCHAR(12) NOT NULL DEFAULT '',
  password VARCHAR(40) NOT NULL,
  salt VARCHAR(100) NOT NULL DEFAULT '',
  UNIQUE(username)
);

CREATE TABLE "bookmark"(
  url VARCHAR(100) NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT DEFAULT '',
  folderid INTEGER REFERENCES "folder" (folderid),
  screenshot VARCHAR(100) DEFAULT 'http://placekitten.com/200/300',
  bookmarkid SERIAL PRIMARY KEY,
  userid INTEGER REFERENCES "user" (userid)
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
