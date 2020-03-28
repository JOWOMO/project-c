CREATE SCHEMA IF NOT EXISTS live
    AUTHORIZATION btb;

CREATE TABLE IF NOT EXISTS live."user"
(
    id text COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    name text COLLATE pg_catalog."default",
    CONSTRAINT user_pkey PRIMARY KEY (id),
    CONSTRAINT email UNIQUE (email)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE live."user"
    OWNER to btb;

CREATE SEQUENCE IF NOT EXISTS live.company_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE live.company_id_seq
    OWNER TO btb;

CREATE TABLE IF NOT EXISTS live.company
(
    id integer NOT NULL DEFAULT nextval('live.company_id_seq'::regclass),
    name_int text COLLATE pg_catalog."default" NOT NULL,
    name_ext text COLLATE pg_catalog."default",
    logo_url text COLLATE pg_catalog."default",
    street_one text COLLATE pg_catalog."default",
    street_two text COLLATE pg_catalog."default",
    street_three text COLLATE pg_catalog."default",
    city text COLLATE pg_catalog."default",
    postalcode text COLLATE pg_catalog."default",
    state text COLLATE pg_catalog."default",
    country text COLLATE pg_catalog."default",
    country_code text COLLATE pg_catalog."default",
    longitude numeric,
    latitude numeric,
    CONSTRAINT company_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE live.company
    OWNER to btb;



    CREATE SEQUENCE IF NOT EXISTS live.team_demand_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE live.team_demand_id_seq
    OWNER TO btb;

CREATE TABLE IF NOT EXISTS live.team_demand
(
    id integer NOT NULL DEFAULT nextval('live.team_demand_id_seq'::regclass),
    company_id integer NOT NULL,
    title text COLLATE pg_catalog."default" NOT NULL,
    description_int text COLLATE pg_catalog."default",
    description_ext text COLLATE pg_catalog."default",
    count integer NOT NULL,
    tags json NOT NULL,
    max_hourly_wages numeric NOT NULL,
    CONSTRAINT team_demand_pkey PRIMARY KEY (id),
    CONSTRAINT company_id FOREIGN KEY (company_id)
        REFERENCES live.company (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE live.team_demand
    OWNER to btb;


CREATE SEQUENCE IF NOT EXISTS live.team_supply_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE live.team_supply_id_seq
    OWNER TO btb;

CREATE TABLE IF NOT EXISTS live.team_supply
(
    id integer NOT NULL DEFAULT nextval('live.team_supply_id_seq'::regclass),
    company_id integer NOT NULL,
    title text COLLATE pg_catalog."default" NOT NULL,
    description_int text COLLATE pg_catalog."default",
    description_ext text COLLATE pg_catalog."default",
    count integer NOT NULL,
    tags json NOT NULL,
    hourly_wages numeric NOT NULL,
    CONSTRAINT team_supply_pkey PRIMARY KEY (id),
    CONSTRAINT company_id FOREIGN KEY (company_id)
        REFERENCES live.company (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE live.team_supply
    OWNER to btb;

