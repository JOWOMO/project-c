insert into btb.customer
    values 
    (1, 'DebugUserId', 'email@email.com', 'first', 'last'),
    (2, 'DebugUserId2', 'email2@email.com', 'first', 'last'),
    (3, 'DebugUserId3', 'email3@email.com', 'first', 'last')
;
     
insert into btb.company
    (
        id,
        name,
        address_line1,
        postal_code,
        city,
        industry_id
    )
select
    id, 
    'Company ' || id,  
    'Street ' || id,
    (
        SELECT postalcode
        FROM
            btb.postalcodes OFFSET id
        LIMIT 1
    ),
    'City ' || id,
    1
from 
    generate_series(1,100000) id
;

insert into btb.company_customer (company_id, customer_id)
select
    id,
    1
from 
    generate_series(1, 2) id
;

insert into btb.company_customer(company_id, customer_id)
select
    id,
    2
from 
    generate_series(3, 50000) id
;

insert into btb.company_customer (company_id, customer_id)
select
    id,
    3
from 
    generate_series(50001, 100000) id
;

insert into btb.team_demand
(
    company_id,
    name,
    quantity,
    skills,
    max_hourly_salary
)
select
    company_id,
    'Demand Team ' || company_id,
    3,
    (
        select array_agg(id)
        from 
        (
            SELECT id
            FROM btb.skill 
            where company_id = company_id
            OFFSET floor(random() * (
                    SELECT COUNT(*) FROM btb.skill)
                )
            LIMIT floor(random() * 5)
        ) sk
    ),
    floor(random() * 10000)
from generate_series(1, 100000) company_id
;

insert into btb.team_supply
(
    company_id,
    name,
    quantity,
    skills,
    hourly_salary
)
select
    company_id,
    'Supply Team ' || company_id,
    3,
    (
        select array_agg(id)
        from 
        (
            SELECT id
            FROM btb.skill 
            where company_id = company_id
            OFFSET floor(random() * (SELECT COUNT(*) FROM btb.skill))
            LIMIT floor(random() * 5)
        ) sk
    ),
    floor(random() * 10000)
from 
    generate_series(1, 100000) company_id
;
