SET ROLE 'lambda_b2b_dev';

CREATE SCHEMA IF NOT EXISTS btb;

CREATE SEQUENCE IF NOT EXISTS btb.skillgroup_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE TABLE IF NOT EXISTS btb.skillgroup
(
    id integer NOT NULL DEFAULT nextval('btb.skillgroup_id_seq'::regclass),
    name text NOT NULL,
    CONSTRAINT skillgroup_pkey PRIMARY KEY (id),
    CONSTRAINT skillgroup_name UNIQUE (name)
);

CREATE SEQUENCE IF NOT EXISTS btb.skill_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE TABLE IF NOT EXISTS btb.skill
(
    id integer NOT NULL DEFAULT nextval('btb.skill_id_seq'::regclass),
    skillgroup_id integer NOT NULL,
    name text NOT NULL,
    
    CONSTRAINT skill_pkey PRIMARY KEY (id),
    CONSTRAINT skill_text UNIQUE (name),

    CONSTRAINT skillgroup_skillgroup_id FOREIGN KEY (skillgroup_id)
        REFERENCES btb.skillgroup (id)
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
    CONSTRAINT customer_pkey PRIMARY KEY (id),
    CONSTRAINT customer_email UNIQUE (email),
    CONSTRAINT customer_external_id UNIQUE (external_id)
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

CREATE TABLE IF NOT EXISTS btb.company_customer
(
    customer_id integer NOT NULL,
    company_id integer NOT NULL,

    CONSTRAINT company_customer_pkey PRIMARY KEY (company_id, customer_id),
    CONSTRAINT company_id FOREIGN KEY (company_id)
        REFERENCES btb.company (id),
    CONSTRAINT customer_id FOREIGN KEY (customer_id)
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
    max_hourly_salary numeric,
    
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
    hourly_salary numeric,
    
    CONSTRAINT team_supply_pkey PRIMARY KEY (id),
    CONSTRAINT company_id FOREIGN KEY (company_id)
        REFERENCES btb.company (id)
);

CREATE INDEX IF NOT EXISTS idx_team_supply_skills on
    btb.team_supply using gin(skills);


CREATE TABLE IF NOT EXISTS btb.postal_codes
(
    countrycode char(2),
    postalcode varchar(20),
    placename varchar(180),
    name1 varchar(100),
    code1 varchar(20),
    name2 varchar(100),
    code2 varchar(20),
    name3 varchar(100),
    code3 varchar(20),
    latitude real,
    longitude real,
    accuracy smallint,
    point geography  
);

CREATE INDEX IF NOT EXISTS idx_postal_codes_postalcode on
    btb.postal_codes(postalcode);

CREATE INDEX IF NOT EXISTS idx_postal_codes_pos on
    btb.postal_codes using gist(point)
;