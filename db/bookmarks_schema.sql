DROP TABLE IF EXISTS "bookmark_tag" CASCADE;
DROP TABLE IF EXISTS "customer_folder" CASCADE;
DROP TABLE IF EXISTS "bookmark" CASCADE;
DROP TABLE IF EXISTS "tag" CASCADE;
DROP TABLE IF EXISTS "folder" CASCADE;
DROP TABLE IF EXISTS "customer" CASCADE;

CREATE TABLE "customer"(
  customerid VARCHAR(50) PRIMARY KEY,
  email VARCHAR(100) NOT NULL
);

CREATE TABLE "folder"(
  folderid SERIAL PRIMARY KEY,
  foldername VARCHAR(100) NOT NULL
);

CREATE TABLE "tag"(
  tagid SERIAL PRIMARY KEY,
  tagname VARCHAR(100) NOT NULL,
  customerid VARCHAR(50) REFERENCES "customer" (customerid)
);

CREATE TABLE "bookmark"(
  url VARCHAR(500) NOT NULL,
  title VARCHAR(500) NOT NULL,
  description TEXT DEFAULT '',
  folderid INTEGER REFERENCES "folder" (folderid),
  screenshot VARCHAR(500) DEFAULT 'placeholder.png',
  bookmarkid SERIAL PRIMARY KEY,
  customerid VARCHAR(50) REFERENCES "customer" (customerid) NOT NULL
);

CREATE TABLE "customer_folder"(
  customerid VARCHAR(50) REFERENCES "customer" (customerid),
  folderid INTEGER REFERENCES "folder" (folderid),
  PRIMARY KEY (customerid, folderid)
);

CREATE TABLE "bookmark_tag"(
  bookmarkid INTEGER REFERENCES "bookmark" (bookmarkid) ON DELETE CASCADE,
  tagid INTEGER REFERENCES "tag" (tagid) ON DELETE CASCADE,
  PRIMARY KEY (bookmarkid, tagid)
);
