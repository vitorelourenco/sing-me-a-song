--
-- PostgreSQL database dump
--

-- Dumped from database version 12.7 (Ubuntu 12.7-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.7 (Ubuntu 12.7-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: genres; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.genres (
    id integer NOT NULL,
    name text NOT NULL
);


--
-- Name: genres_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.genres_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: genres_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.genres_id_seq OWNED BY public.genres.id;


--
-- Name: genres_recommendations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.genres_recommendations (
    id integer NOT NULL,
    "genreId" integer NOT NULL,
    "recommendationId" integer NOT NULL
);


--
-- Name: genres_recommendations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.genres_recommendations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: genres_recommendations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.genres_recommendations_id_seq OWNED BY public.genres_recommendations.id;


--
-- Name: recommendations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.recommendations (
    id integer NOT NULL,
    name text NOT NULL,
    "youtubeLink" text NOT NULL,
    score integer DEFAULT 0 NOT NULL
);


--
-- Name: recommendations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.recommendations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: recommendations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.recommendations_id_seq OWNED BY public.recommendations.id;


--
-- Name: genres id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.genres ALTER COLUMN id SET DEFAULT nextval('public.genres_id_seq'::regclass);


--
-- Name: genres_recommendations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.genres_recommendations ALTER COLUMN id SET DEFAULT nextval('public.genres_recommendations_id_seq'::regclass);


--
-- Name: recommendations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recommendations ALTER COLUMN id SET DEFAULT nextval('public.recommendations_id_seq'::regclass);


--
-- Data for Name: genres; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.genres VALUES (1, 'electornic');
INSERT INTO public.genres VALUES (2, 'pop');
INSERT INTO public.genres VALUES (3, 'hiphop');
INSERT INTO public.genres VALUES (4, 'rock');
INSERT INTO public.genres VALUES (5, 'blues');
INSERT INTO public.genres VALUES (6, 'gospel');
INSERT INTO public.genres VALUES (7, 'funk');
INSERT INTO public.genres VALUES (8, 'opera');
INSERT INTO public.genres VALUES (9, 'rap');
INSERT INTO public.genres VALUES (10, 'swing');
INSERT INTO public.genres VALUES (11, 'classical');


--
-- Data for Name: genres_recommendations; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.genres_recommendations VALUES (1, 1, 1);
INSERT INTO public.genres_recommendations VALUES (2, 2, 1);
INSERT INTO public.genres_recommendations VALUES (5, 9, 3);
INSERT INTO public.genres_recommendations VALUES (6, 7, 3);
INSERT INTO public.genres_recommendations VALUES (7, 6, 3);
INSERT INTO public.genres_recommendations VALUES (8, 4, 4);
INSERT INTO public.genres_recommendations VALUES (9, 3, 4);
INSERT INTO public.genres_recommendations VALUES (10, 2, 4);
INSERT INTO public.genres_recommendations VALUES (11, 5, 5);
INSERT INTO public.genres_recommendations VALUES (12, 10, 5);
INSERT INTO public.genres_recommendations VALUES (13, 11, 6);
INSERT INTO public.genres_recommendations VALUES (14, 4, 7);
INSERT INTO public.genres_recommendations VALUES (15, 8, 7);
INSERT INTO public.genres_recommendations VALUES (16, 5, 8);
INSERT INTO public.genres_recommendations VALUES (17, 10, 8);
INSERT INTO public.genres_recommendations VALUES (18, 5, 9);
INSERT INTO public.genres_recommendations VALUES (19, 8, 9);


--
-- Data for Name: recommendations; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.recommendations VALUES (8, 'Imagine Dragons - On Top Of The World (Official Music Video)', 'https://www.youtube.com/watch?v=w5tWYmIOWGk', -3);
INSERT INTO public.recommendations VALUES (9, 'Bruno Mars - The Lazy Song (Official Music Video)', 'https://www.youtube.com/watch?v=fLexgOxsZu0', 1);
INSERT INTO public.recommendations VALUES (4, 'Maroon 5 - Sugar (Official Music Video)', 'https://www.youtube.com/watch?v=09R8_2nJtjg', 0);
INSERT INTO public.recommendations VALUES (5, 'MAGIC! - Rude (Official Video)', 'https://www.youtube.com/watch?v=PIh2xe4jnpk', 19);
INSERT INTO public.recommendations VALUES (1, 'Imagine Dragons - Thunder', 'https://www.youtube.com/watch?v=fKopy74weus', 23);
INSERT INTO public.recommendations VALUES (3, 'Lil Nas X - Old Town Road (Official Video) ft. Billy Ray Cyrus', 'https://www.youtube.com/watch?v=r7qovpFAGrQ', -5);
INSERT INTO public.recommendations VALUES (6, 'Fun.: We Are Young ft. Janelle Monáe [OFFICIAL VIDEO]', 'https://www.youtube.com/watch?v=Sv6dMFF_yts', 35);
INSERT INTO public.recommendations VALUES (7, 'Coldplay - Paradise (Official Video)', 'https://www.youtube.com/watch?v=1G4isv_Fylg', -1);


--
-- Name: genres_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.genres_id_seq', 11, true);


--
-- Name: genres_recommendations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.genres_recommendations_id_seq', 19, true);


--
-- Name: recommendations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.recommendations_id_seq', 9, true);


--
-- Name: genres genres_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_name_key UNIQUE (name);


--
-- Name: genres genres_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_pk PRIMARY KEY (id);


--
-- Name: genres_recommendations genres_recommendations_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.genres_recommendations
    ADD CONSTRAINT genres_recommendations_pk PRIMARY KEY (id);


--
-- Name: recommendations recommendations_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recommendations
    ADD CONSTRAINT recommendations_pk PRIMARY KEY (id);


--
-- Name: recommendations recommendations_youtubeLink_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recommendations
    ADD CONSTRAINT "recommendations_youtubeLink_key" UNIQUE ("youtubeLink");


--
-- Name: genres_recommendations genres_recommendations_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.genres_recommendations
    ADD CONSTRAINT genres_recommendations_fk0 FOREIGN KEY ("genreId") REFERENCES public.genres(id);


--
-- Name: genres_recommendations genres_recommendations_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.genres_recommendations
    ADD CONSTRAINT genres_recommendations_fk1 FOREIGN KEY ("recommendationId") REFERENCES public.recommendations(id);


--
-- PostgreSQL database dump complete
--

