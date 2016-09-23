--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.4
-- Dumped by pg_dump version 9.5.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: bookmark; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE bookmark (
    url character varying(250) NOT NULL,
    title character varying(250) NOT NULL,
    description text DEFAULT ''::text,
    folderid integer,
    screenshot character varying(100) DEFAULT 'http://placekitten.com/200/300'::character varying,
    bookmarkid integer NOT NULL,
    customerid integer
);


--
-- Name: bookmark_bookmarkid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE bookmark_bookmarkid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: bookmark_bookmarkid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE bookmark_bookmarkid_seq OWNED BY bookmark.bookmarkid;


--
-- Name: bookmark_tags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE bookmark_tags (
    bookmarkid integer NOT NULL,
    tagid integer NOT NULL
);


--
-- Name: customer; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE customer (
    customerid integer NOT NULL
);


--
-- Name: folder; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE folder (
    folderid integer NOT NULL,
    foldername character varying(20) NOT NULL,
    customerid integer
);


--
-- Name: folder_folderid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE folder_folderid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: folder_folderid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE folder_folderid_seq OWNED BY folder.folderid;


--
-- Name: tag; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE tag (
    tagid integer NOT NULL,
    tag character varying(50) NOT NULL
);


--
-- Name: tag_tagid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE tag_tagid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tag_tagid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE tag_tagid_seq OWNED BY tag.tagid;


--
-- Name: bookmarkid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY bookmark ALTER COLUMN bookmarkid SET DEFAULT nextval('bookmark_bookmarkid_seq'::regclass);


--
-- Name: folderid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY folder ALTER COLUMN folderid SET DEFAULT nextval('folder_folderid_seq'::regclass);


--
-- Name: tagid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY tag ALTER COLUMN tagid SET DEFAULT nextval('tag_tagid_seq'::regclass);


--
-- Data for Name: bookmark; Type: TABLE DATA; Schema: public; Owner: -
--

COPY bookmark (url, title, description, folderid, screenshot, bookmarkid, customerid) FROM stdin;
\.


--
-- Name: bookmark_bookmarkid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('bookmark_bookmarkid_seq', 1, false);


--
-- Data for Name: bookmark_tags; Type: TABLE DATA; Schema: public; Owner: -
--

COPY bookmark_tags (bookmarkid, tagid) FROM stdin;
\.


--
-- Data for Name: customer; Type: TABLE DATA; Schema: public; Owner: -
--

COPY customer (customerid) FROM stdin;
12989626
\.


--
-- Data for Name: folder; Type: TABLE DATA; Schema: public; Owner: -
--

COPY folder (folderid, foldername, customerid) FROM stdin;
1	work	12989626
\.


--
-- Name: folder_folderid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('folder_folderid_seq', 1, true);


--
-- Data for Name: tag; Type: TABLE DATA; Schema: public; Owner: -
--

COPY tag (tagid, tag) FROM stdin;
\.


--
-- Name: tag_tagid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('tag_tagid_seq', 1, false);


--
-- Name: bookmark_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY bookmark
    ADD CONSTRAINT bookmark_pkey PRIMARY KEY (bookmarkid);


--
-- Name: bookmark_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY bookmark_tags
    ADD CONSTRAINT bookmark_tags_pkey PRIMARY KEY (bookmarkid, tagid);


--
-- Name: customer_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (customerid);


--
-- Name: folder_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY folder
    ADD CONSTRAINT folder_pkey PRIMARY KEY (folderid);


--
-- Name: tag_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tag
    ADD CONSTRAINT tag_pkey PRIMARY KEY (tagid);


--
-- Name: bookmark_customerid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY bookmark
    ADD CONSTRAINT bookmark_customerid_fkey FOREIGN KEY (customerid) REFERENCES customer(customerid);


--
-- Name: bookmark_folderid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY bookmark
    ADD CONSTRAINT bookmark_folderid_fkey FOREIGN KEY (folderid) REFERENCES folder(folderid);


--
-- Name: bookmark_tags_bookmarkid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY bookmark_tags
    ADD CONSTRAINT bookmark_tags_bookmarkid_fkey FOREIGN KEY (bookmarkid) REFERENCES bookmark(bookmarkid);


--
-- Name: bookmark_tags_tagid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY bookmark_tags
    ADD CONSTRAINT bookmark_tags_tagid_fkey FOREIGN KEY (tagid) REFERENCES tag(tagid);


--
-- Name: folder_customerid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY folder
    ADD CONSTRAINT folder_customerid_fkey FOREIGN KEY (customerid) REFERENCES customer(customerid);


--
-- PostgreSQL database dump complete
--

