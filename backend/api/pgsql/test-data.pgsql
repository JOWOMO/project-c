insert into btb.customer
    values 
    (1, 'DebugUserId', 'email@email.com', 'name'),
    (2, 'DebugUserId2', 'email2@email.com', 'name'),
    (3, 'DebugUserId3', 'email3@email.com', 'name')
;
     
insert into btb.company
    (
        id,
        name,
        address_line1,
        postal_code,
        city
    )
select
    id, 
    'Company ' || id,  
    'Line 1',
    (
        SELECT postalcode
        FROM
            btb.postal_codes OFFSET floor(random() * (
                SELECT COUNT(*) FROM btb.postal_codes)
            )
        LIMIT 1
    ),
    'Böblingen'
from 
    generate_series(1,100) id
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
    generate_series(3, 50) id
;

insert into btb.company_customer (company_id, customer_id)
select
    id,
    3
from 
    generate_series(51, 100) id
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
    id,
    'Demand Team ' || id,
    3,
    (
        select array_agg(id)
        from 
        (
            SELECT id
            FROM
                btb.skill OFFSET floor(random() * (
                    SELECT COUNT(*) FROM btb.skill)
                )
            LIMIT 3
        ) sk
    ),
    3000
from generate_series(1, 100) id
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
    id,
    'Supply Team ' || id,
    3,
    (
        select array_agg(id)
        from 
        (
            SELECT id
            FROM
                btb.skill OFFSET floor(random() * (
                    SELECT COUNT(*) FROM btb.skill)
                )
            LIMIT 3
        ) sk
    ),
    3000
from 
    generate_series(1, 100) id
;
