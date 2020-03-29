SET ROLE 'lambda_b2b';

CREATE SCHEMA IF NOT EXISTS btb
    AUTHORIZATION lambda_b2b;

CREATE SEQUENCE IF NOT EXISTS btb.skill_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE TABLE IF NOT EXISTS btb.skill
(
    id integer NOT NULL DEFAULT nextval('btb.skill_id_seq'::regclass),
    text text NOT NULL,
    CONSTRAINT skill_pkey PRIMARY KEY (id),
    CONSTRAINT text UNIQUE (text)
);

CREATE SEQUENCE IF NOT EXISTS btb.customer_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE TABLE IF NOT EXISTS btb.customer
(
    id integer NOT NULL DEFAULT nextval('btb.customer_id_seq'::regclass),
    external_id text NOT NULL,
    email text NOT NULL,
    name text NOT NULL,
    CONSTRAINT user_pkey PRIMARY KEY (id),
    CONSTRAINT email UNIQUE (email)
);

CREATE SEQUENCE IF NOT EXISTS btb.company_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE TABLE IF NOT EXISTS btb.company
(
    id integer NOT NULL DEFAULT nextval('btb.company_id_seq'::regclass),
    
    comments_int text,
    comments_ext text,

    name text not null,
    logo_url text,
    
    address_line1 text,
    address_line2 text,
    address_line3 text,
    postal_code text,
    city text,

    state text,
    country text,
    country_code text,

    longitude numeric,
    latitude numeric,
    
    CONSTRAINT company_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS btb.company_user
(
    user_id integer NOT NULL,
    company_id integer NOT NULL,

    CONSTRAINT company_user_pkey PRIMARY KEY (company_id, user_id),
    CONSTRAINT company_id FOREIGN KEY (company_id)
        REFERENCES btb.company (id),
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES btb.customer (id) 
);

CREATE SEQUENCE IF NOT EXISTS btb.team_demand_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE TABLE IF NOT EXISTS btb.team_demand
(
    id integer NOT NULL DEFAULT nextval('btb.team_demand_id_seq'::regclass),
    company_id integer NOT NULL,
    name text NOT NULL,
    description_int text,
    description_ext text,
    quantity integer NOT NULL,
    skills integer[] NULL,
    max_hourly_wages numeric,
    CONSTRAINT team_demand_pkey PRIMARY KEY (id),
    CONSTRAINT company_id FOREIGN KEY (company_id)
        REFERENCES btb.company (id)
);

CREATE SEQUENCE IF NOT EXISTS btb.team_supply_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE TABLE IF NOT EXISTS btb.team_supply
(
    id integer NOT NULL DEFAULT nextval('btb.team_supply_id_seq'::regclass),
    company_id integer NOT NULL,
    name text NOT NULL,
    description_int text,
    description_ext text,
    quantity integer NOT NULL,
    skills integer[] NULL,
    hourly_wages numeric,
    CONSTRAINT team_supply_pkey PRIMARY KEY (id),
    CONSTRAINT company_id FOREIGN KEY (company_id)
        REFERENCES btb.company (id)
);
