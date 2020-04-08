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

CREATE SEQUENCE IF NOT EXISTS btb.industry_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE TABLE IF NOT EXISTS btb.industry
(
    id integer NOT NULL DEFAULT nextval('btb.industry_id_seq'::regclass),
    name text NOT NULL,
    CONSTRAINT industry_pkey PRIMARY KEY (id),
    CONSTRAINT industry_name UNIQUE (name)
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

    first_name text NOT NULL,
    last_name text NOT NULL,

    picture_url text,

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
    industry_id integer,

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
        REFERENCES btb.industry (id)
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

drop view if exists btb.company_with_contact;
create or replace view btb.company_with_contact as
select 
    co.*
    ,jsonb_build_object(
        'id',
        u.id,
        'first_name',
        u.first_name,
        'last_name',
        u.last_name,
        'email',
        u.email,
        'picture_url',
        u.picture_url
    ) 
    as contact
    ,u.id as owner_id
    ,u.external_id as owner_external_id
from 
    -- currently there is only a one to one realationship such this doesn't hurt
    btb.company co,
    btb.company_customer cc,
    btb.customer u
where 
        co.id =  cc.company_id 
    and u.id  = cc.customer_id
;

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
    is_active boolean default true,

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

CREATE INDEX IF NOT EXISTS idx_team_demand_skills on
    btb.team_demand using gin(skills);

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
    is_active boolean default true,

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

CREATE TABLE IF NOT EXISTS btb.postalcodes
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

CREATE INDEX IF NOT EXISTS idx_postalcodes_postalcode on
    btb.postalcodes(postalcode);

CREATE TABLE IF NOT EXISTS btb.centered_postalcodes
(
    postalcode varchar(20),
    point geography  
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_centered_postalcodes_postalcode on
    btb.centered_postalcodes(postalcode);

CREATE INDEX IF NOT EXISTS idx_centered_postalcodes_point on
    btb.centered_postalcodes using gist(point)
;

drop view if exists btb.match_team_supply;
create or replace view btb.match_team_supply as
select 
    u.external_id, 
    
    co.id as company_id, 
    co.name as company_name,
    
    s.id record_id, 
    s.skills, 
    s.quantity, 
    s.hourly_salary, 
    
    p.point
from 
    btb.team_supply s, 
    btb.company co,

    btb.company_customer cu,
    btb.customer u,

    btb.centered_postalcodes p
where 
        s.is_active = true
    -- company for supplyp
    and s.company_id = co.id
    and cu.company_id = s.company_id
    
    -- user condition
    and cu.customer_id = u.id

    -- postalcode
    and co.postal_code = p.postalcode
;

drop view if exists btb.match_team_demand;
create or replace view btb.match_team_demand as
select 
    u.external_id, 
    
    co.id as company_id, 
    co.name as company_name, 
    
    d.id record_id, 
    d.skills, 
    d.quantity, 
    d.max_hourly_salary as hourly_salary, 
    
    p.point
from 
    btb.team_demand d, 
    btb.company co,

    btb.company_customer cu,
    btb.customer u,

    btb.centered_postalcodes p
where 
        d.is_active = true
    -- company for supplyp
    and d.company_id = co.id
    and cu.company_id = d.company_id
    
    -- user condition
    and cu.customer_id = u.id

    -- postalcode
    and co.postal_code = p.postalcode
;

drop function if exists btb.get_postalcode_position(text);
CREATE FUNCTION btb.get_postalcode_position(text) RETURNS geography
    AS '
select point
from 
    btb.centered_postalcodes     
where
    postalcode = $1
'
    LANGUAGE SQL
    IMMUTABLE
    RETURNS NULL ON NULL INPUT
;

-- drop table if exists btb.contact_request;
CREATE TABLE IF NOT EXISTS btb.contact_request
(
    external_id text not null,
    date timestamp with time zone not null default now(),
    
    distance integer,
    match_type text not null,

    request_id integer not null,
    request jsonb not null,

    response_id integer not null,
    response jsonb not null
);

drop view if exists btb.contact_requests_today;
create or replace view btb.contact_requests_today as
select * from btb.contact_request
where 
    date_trunc('day', date at time zone 'Europe/Paris') = date_trunc('day', now() at time zone 'Europe/Paris')
;

drop view if exists btb.contact_requests_week;
create or replace view btb.contact_requests_week as
select * 
from btb.contact_request
where 
    date_trunc('day', date at time zone 'Europe/Paris') >= date_trunc('day', now() at time zone 'Europe/Paris' - INTERVAL '6 DAY' ) 
;

-- drop index btb.idx_contact_request_query;
-- CREATE INDEX IF NOT EXISTS idx_contact_request_query 
--     on btb.contact_request (
--         external_id,
--         match_type,
--         request_id,
--         response_id
--     )
-- ;

CREATE INDEX IF NOT EXISTS idx_contact_request_throttle
    on btb.contact_request (
        external_id,
        date_trunc('day', date at time zone 'Europe/Paris'),
        response_id
    )
;
