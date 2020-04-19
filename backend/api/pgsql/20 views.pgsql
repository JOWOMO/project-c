SET ROLE 'lambda_b2b_dev';

CREATE SCHEMA IF NOT EXISTS btb;

drop index if exists btb_data.idx_skill_match_id;
CREATE UNIQUE INDEX idx_skill_match_id on
    btb_data.skill (match_id);

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
        'w',
        u.picture_url
    ) 
    as contact
    ,u.id as owner_id
    ,u.external_id as owner_external_id
from 
    -- currently there is only a one to one realationship such this doesn't hurt
    btb_data.company co,
    btb_data.company_customer cc,
    btb_data.customer u
where 
        co.id =  cc.company_id 
    and u.id  = cc.customer_id
;

drop index if exists btb_data.idx_team_demand_skills;
CREATE INDEX idx_team_demand_skills on
    btb_data.team_demand using gin(skills gin__int_ops);

drop index if exists btb_data.idx_team_demand_active;
CREATE INDEX idx_team_demand_active on
    btb_data.team_demand (is_active, company_id);

drop index if exists btb_data.idx_team_supply_skills;
CREATE INDEX idx_team_supply_skills on
    btb_data.team_supply using gin(skills gin__int_ops);

drop index if exists btb_data.idx_team_supply_active;
CREATE INDEX idx_team_supply_active on
    btb_data.team_supply (is_active, company_id);

drop index if exists btb_data.idx_postalcodes_postalcode;
CREATE INDEX idx_postalcodes_postalcode on
    btb_data.postalcodes(postalcode);

drop index if exists btb_data.idx_centered_postalcodes_postalcode;
CREATE UNIQUE INDEX idx_centered_postalcodes_postalcode on
    btb_data.centered_postalcodes(postalcode);

drop index if exists btb_data.idx_centered_postalcodes_point;
CREATE INDEX idx_centered_postalcodes_point on
    btb_data.centered_postalcodes using gist(point)
;

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
    btb_data.team_supply s, 
    btb_data.company co,

    btb_data.company_customer cu,
    btb_data.customer u,

    btb_data.centered_postalcodes p
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
    btb_data.team_demand d, 
    btb_data.company co,

    btb_data.company_customer cu,
    btb_data.customer u,

    btb_data.centered_postalcodes p
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

CREATE FUNCTION btb.get_postalcode_position(text) RETURNS geography
    AS '
select point
from 
    btb_data.centered_postalcodes     
where
    postalcode = $1
'
    LANGUAGE SQL
    IMMUTABLE
    RETURNS NULL ON NULL INPUT
;

create or replace view btb.contact_requests_today as
select * from btb_data.contact_request
where 
    date_trunc('day', date_created at time zone 'Europe/Paris') = date_trunc('day', now() at time zone 'Europe/Paris')
;

create or replace view btb.contact_requests_week as
select * 
from btb_data.contact_request
where 
    date_trunc('day', date_created at time zone 'Europe/Paris') >= date_trunc('day', now() at time zone 'Europe/Paris' - INTERVAL '6 DAY' ) 
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
    on btb_data.contact_request (
        external_id,
        date_trunc('day', date_created at time zone 'Europe/Paris'),
        response_id
    )
;

