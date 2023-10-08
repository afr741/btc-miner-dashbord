--
-- PostgreSQL database dump
--

-- Dumped from database version 14.9 (Homebrew)
-- Dumped by pg_dump version 14.9 (Homebrew)

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
-- Name: mining_equipment; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.mining_equipment (
    id integer NOT NULL,
    name character varying(255),
    location character varying(255),
    hashrate character varying(255)
);


ALTER TABLE public.mining_equipment OWNER TO "user";

--
-- Name: mining_equipment_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.mining_equipment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.mining_equipment_id_seq OWNER TO "user";

--
-- Name: mining_equipment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.mining_equipment_id_seq OWNED BY public.mining_equipment.id;


--
-- Name: mining_stats; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.mining_stats (
    total_hash_rate numeric,
    active_miners integer,
    mining_revenue numeric
);


ALTER TABLE public.mining_stats OWNER TO "user";

--
-- Name: users; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO "user";

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO "user";

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: mining_equipment id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.mining_equipment ALTER COLUMN id SET DEFAULT nextval('public.mining_equipment_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: mining_equipment; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.mining_equipment (id, name, location, hashrate) FROM stdin;
1	Antminer S1	Mining Facility C	95.47337585632621 TH/S
2	Antminer S2	Mining Facility A	63.124653604061336 TH/S
3	Antminer S3	Mining Facility B	150.0160810465253 TH/S
4	Antminer S4	Mining Facility C	129.9991929861352 TH/S
5	Antminer S5	Mining Facility C	89.89673834028852 TH/S
6	Antminer S6	Mining Facility A	119.75219585930984 TH/S
7	Antminer S7	Mining Facility C	177.73249985564564 TH/S
8	Antminer S8	Mining Facility B	171.52280818167156 TH/S
9	Antminer S9	Mining Facility A	74.60731729087343 TH/S
10	Antminer S10	Mining Facility B	180.02524149781846 TH/S
11	Antminer S11	Mining Facility A	199.45025081508592 TH/S
12	Antminer S12	Mining Facility C	74.44729229444378 TH/S
13	Antminer S13	Mining Facility B	136.30782054928818 TH/S
14	Antminer S14	Mining Facility C	142.48412073650863 TH/S
15	Antminer S15	Mining Facility C	62.464767881082736 TH/S
16	Antminer S16	Mining Facility A	99.03188491937291 TH/S
17	Antminer S17	Mining Facility A	81.77582864149117 TH/S
18	Antminer S18	Mining Facility B	167.1921699219566 TH/S
19	Antminer S19	Mining Facility A	195.20203815318223 TH/S
20	Antminer S20	Mining Facility A	66.12278700825286 TH/S
21	Antminer S21	Mining Facility C	51.056059711425526 TH/S
22	Antminer S22	Mining Facility A	126.13131212154948 TH/S
23	Antminer S23	Mining Facility C	50.36183737814562 TH/S
24	Antminer S24	Mining Facility C	197.00269471979692 TH/S
25	Antminer S25	Mining Facility C	94.79672000946542 TH/S
26	Antminer S26	Mining Facility A	59.53215896298039 TH/S
27	Antminer S27	Mining Facility B	133.92114717678868 TH/S
28	Antminer S28	Mining Facility A	54.44132728352372 TH/S
29	Antminer S29	Mining Facility B	111.41241501659705 TH/S
30	Antminer S30	Mining Facility B	170.96441047370985 TH/S
31	Antminer S31	Mining Facility A	77.96597892159402 TH/S
32	Antminer S32	Mining Facility A	172.5679584627439 TH/S
33	Antminer S33	Mining Facility B	97.62376788480307 TH/S
34	Antminer S34	Mining Facility B	155.7351177143219 TH/S
35	Antminer S35	Mining Facility B	72.51441805891815 TH/S
36	Antminer S36	Mining Facility C	192.85518250537893 TH/S
37	Antminer S37	Mining Facility A	118.81691947450298 TH/S
38	Antminer S38	Mining Facility C	113.25851550484796 TH/S
39	Antminer S39	Mining Facility C	88.20287234406001 TH/S
40	Antminer S40	Mining Facility A	75.58964436850513 TH/S
41	Antminer S41	Mining Facility B	118.33447532022224 TH/S
42	Antminer S42	Mining Facility C	76.58643260672552 TH/S
43	Antminer S43	Mining Facility B	100.39759580736879 TH/S
44	Antminer S44	Mining Facility C	68.09202633689665 TH/S
45	Antminer S45	Mining Facility C	115.92681003843784 TH/S
46	Antminer S46	Mining Facility B	110.42429289777543 TH/S
47	Antminer S47	Mining Facility A	60.763894911503236 TH/S
48	Antminer S48	Mining Facility B	65.58413626321806 TH/S
49	Antminer S49	Mining Facility B	176.67947782024896 TH/S
50	Antminer S50	Mining Facility C	86.69555233014857 TH/S
51	Antminer S51	Mining Facility A	79.11407731219045 TH/S
52	Antminer S52	Mining Facility C	139.84981627168122 TH/S
53	Antminer S53	Mining Facility C	108.8508012734221 TH/S
54	Antminer S54	Mining Facility C	124.01236768066194 TH/S
55	Antminer S55	Mining Facility C	50.728606175594045 TH/S
56	Antminer S56	Mining Facility C	70.45330711300662 TH/S
57	Antminer S57	Mining Facility B	135.5781885540436 TH/S
58	Antminer S58	Mining Facility C	186.3942395841729 TH/S
59	Antminer S59	Mining Facility C	143.59418053613734 TH/S
60	Antminer S60	Mining Facility B	162.87362569298662 TH/S
61	Antminer S61	Mining Facility C	144.95504593026277 TH/S
62	Antminer S62	Mining Facility A	178.20560698039458 TH/S
63	Antminer S63	Mining Facility C	133.74935224238772 TH/S
64	Antminer S64	Mining Facility C	73.23404454957276 TH/S
65	Antminer S65	Mining Facility A	102.779180521678 TH/S
66	Antminer S66	Mining Facility C	68.91290484690525 TH/S
67	Antminer S67	Mining Facility A	55.65660634453676 TH/S
68	Antminer S68	Mining Facility C	173.29330483724993 TH/S
69	Antminer S69	Mining Facility A	146.27997541403693 TH/S
70	Antminer S70	Mining Facility A	58.3958867101871 TH/S
71	Antminer S71	Mining Facility B	86.46253273077275 TH/S
72	Antminer S72	Mining Facility C	77.28540406465844 TH/S
73	Antminer S73	Mining Facility C	172.26687779581303 TH/S
74	Antminer S74	Mining Facility A	52.28762549142741 TH/S
75	Antminer S75	Mining Facility B	80.44420373345424 TH/S
76	Antminer S76	Mining Facility A	189.57567630381706 TH/S
77	Antminer S77	Mining Facility A	111.00872291123875 TH/S
78	Antminer S78	Mining Facility C	87.52009239711012 TH/S
79	Antminer S79	Mining Facility C	151.4329598045196 TH/S
80	Antminer S80	Mining Facility C	193.12417617718205 TH/S
81	Antminer S81	Mining Facility B	95.4548981612894 TH/S
82	Antminer S82	Mining Facility B	110.84016649913389 TH/S
83	Antminer S83	Mining Facility B	154.82937885619447 TH/S
84	Antminer S84	Mining Facility B	73.15381379928401 TH/S
85	Antminer S85	Mining Facility A	176.2139560812601 TH/S
86	Antminer S86	Mining Facility C	77.47946931461922 TH/S
87	Antminer S87	Mining Facility A	95.046546388749 TH/S
88	Antminer S88	Mining Facility B	68.30781264535506 TH/S
89	Antminer S89	Mining Facility C	58.3387945317631 TH/S
90	Antminer S90	Mining Facility C	56.63901687636445 TH/S
91	Antminer S91	Mining Facility A	130.21724693362052 TH/S
92	Antminer S92	Mining Facility B	187.61547254992553 TH/S
93	Antminer S93	Mining Facility A	115.56034927622423 TH/S
95	Antminer S95	Mining Facility C	196.59549774207164 TH/S
96	Antminer S96	Mining Facility C	115.586554731504 TH/S
97	Antminer S97	Mining Facility C	119.96826319038027 TH/S
98	Antminer S98	Mining Facility B	179.04467296982017 TH/S
\.


--
-- Data for Name: mining_stats; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.mining_stats (total_hash_rate, active_miners, mining_revenue) FROM stdin;
1245.4265974589805	46	8930.862364781207
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.users (id, username, password) FROM stdin;
1	satoshi	nakomoto
\.


--
-- Name: mining_equipment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.mining_equipment_id_seq', 132, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: mining_equipment mining_equipment_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.mining_equipment
    ADD CONSTRAINT mining_equipment_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- PostgreSQL database dump complete
--

