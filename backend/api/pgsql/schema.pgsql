SET ROLE 'lambda_b2b';

CREATE SCHEMA IF NOT EXISTS btb
    AUTHORIZATION lambda_b2b;
    
CREATE SEQUENCE IF NOT EXISTS btb.customer_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE TABLE IF NOT EXISTS btb.customer
(
    id integer NOT NULL DEFAULT nextval('btb.customer_id_seq'::regclass),
    external_id text not null,
    email text NOT NULL,

    name text,
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
    
    name_int text NOT NULL,
    name_ext text,

    logo_url text,
    line_one text,
    line_two text,
    line_three text,
    postalcode text,
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
    title text NOT NULL,
    description_int text,
    description_ext text,
    quantity integer NOT NULL,
    tags text[] NULL,
    max_hourly_wages numeric NOT NULL,
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
    title text NOT NULL,
    description_int text,
    description_ext text,
    quantity integer NOT NULL,
    tags text[] NULL,
    hourly_wages numeric NOT NULL,
    CONSTRAINT team_supply_pkey PRIMARY KEY (id),
    CONSTRAINT company_id FOREIGN KEY (company_id)
        REFERENCES btb.company (id)
);
