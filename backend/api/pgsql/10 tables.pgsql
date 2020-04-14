SET ROLE 'lambda_b2b_dev';

CREATE SCHEMA IF NOT EXISTS btb_data;

CREATE TABLE IF NOT EXISTS btb_data.skill_group
(
    id uuid NOT NULL default uuid_generate_v4(),
    name text NOT NULL,
    is_active boolean default true,
    CONSTRAINT skill_group_pkey PRIMARY KEY (id),
    CONSTRAINT skill_group_name UNIQUE (name)
);

CREATE TABLE IF NOT EXISTS btb_data.skill
(
    id uuid NOT NULL default uuid_generate_v4(),
    skill_group_id uuid NOT NULL,
    match_id integer NOT NULL,
    is_active boolean default true,
    name text NOT NULL,
    
    CONSTRAINT skill_pkey PRIMARY KEY (id),
    CONSTRAINT skill_text UNIQUE (name),
    CONSTRAINT skill_match_id UNIQUE (match_id),

    CONSTRAINT skill_group_skill_group_id FOREIGN KEY (skill_group_id)
        REFERENCES btb_data.skill_group (id)
);

CREATE TABLE IF NOT EXISTS btb_data.industry
(
    id uuid NOT NULL default uuid_generate_v4(),
    name text NOT NULL,
    is_active boolean default true,
    CONSTRAINT industry_pkey PRIMARY KEY (id),
    CONSTRAINT industry_name UNIQUE (name)
);

CREATE TABLE IF NOT EXISTS btb_data.team_name
(
    id uuid NOT NULL default uuid_generate_v4(),
    name text NOT NULL,
    is_active boolean default true,
    CONSTRAINT team_name_pkey PRIMARY KEY (id),
    CONSTRAINT team_name_name UNIQUE (name)
);

CREATE TABLE IF NOT EXISTS btb_data.customer
(
    id uuid not null default uuid_generate_v4(),
    external_id text NOT NULL,
    email text NOT NULL,

    first_name text NOT NULL,
    last_name text NOT NULL,

    picture_url text,

    CONSTRAINT customer_pkey PRIMARY KEY (id),
    CONSTRAINT customer_email UNIQUE (email),
    CONSTRAINT customer_external_id UNIQUE (external_id)
);

CREATE TABLE IF NOT EXISTS btb_data.company
(
    id uuid not null default uuid_generate_v4(),
    industry_id uuid,

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
    
    CONSTRAINT company_pkey PRIMARY KEY (id),

    CONSTRAINT company_industry_id FOREIGN KEY (industry_id)
        REFERENCES btb_data.industry (id)
);

CREATE TABLE IF NOT EXISTS btb_data.company_customer
(
    customer_id uuid NOT NULL,
    company_id uuid NOT NULL,

    CONSTRAINT company_customer_pkey PRIMARY KEY (company_id, customer_id),

    CONSTRAINT company_id FOREIGN KEY (company_id)
        REFERENCES btb_data.company (id),

    CONSTRAINT customer_id FOREIGN KEY (customer_id)
        REFERENCES btb_data.customer (id) 
);

CREATE TABLE IF NOT EXISTS btb_data.team_demand
(
    id uuid NOT NULL default uuid_generate_v4(),
    company_id uuid NOT NULL,
    is_active boolean default true,
    created_on timestamp with time zone not null default now(),
    modified_on timestamp with time zone not null default now(),

    name text NOT NULL,
    description_int text,
    description_ext text,
    quantity integer NOT NULL,
    skills integer[] NULL,
    max_hourly_salary numeric,
    
    CONSTRAINT team_demand_pkey PRIMARY KEY (id),
    CONSTRAINT company_id FOREIGN KEY (company_id)
        REFERENCES btb_data.company (id)
);

CREATE TABLE IF NOT EXISTS btb_data.team_supply
(
    id uuid NOT NULL default uuid_generate_v4(),
    company_id uuid NOT NULL,
    is_active boolean default true,
    created_on timestamp with time zone not null default now(),
    modified_on timestamp with time zone not null default now(),

    name text NOT NULL,
    description_int text,
    description_ext text,
    quantity integer NOT NULL,
    skills integer[] NULL,
    hourly_salary numeric,
    
    CONSTRAINT team_supply_pkey PRIMARY KEY (id),
    CONSTRAINT company_id FOREIGN KEY (company_id)
        REFERENCES btb_data.company (id)
);

CREATE TABLE IF NOT EXISTS btb_data.postalcodes
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
    accuracy smallint
);

CREATE TABLE IF NOT EXISTS btb_data.centered_postalcodes
(
    postalcode varchar(20),
    point geography  
);

-- drop table if exists btb_data.contact_request;
CREATE TABLE IF NOT EXISTS btb_data.contact_request
(
    external_id text not null,
    date timestamp with time zone not null default now(),
    
    distance integer,
    match_type text not null,

    request_id uuid not null,
    request jsonb not null,

    response_id uuid not null,
    response jsonb not null
);

