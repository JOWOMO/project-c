
  -- To enforce index usage because we have only 2 records for this test... 
SET enable_seqscan TO off;

explain
select 
    distinct s.company_id as id, array_agg(s.id) as supplies
from 
    btb.team_supply s, 
    btb.company co,

    btb.company_customer cu,
    btb.customer u
where 
    -- company for supplyp
        s.company_id = co.id
    and cu.company_id = s.company_id
    
    -- user condition
    and cu.customer_id = u.id
    and u.external_id <> 'abc'

    -- query
    and s.skills @> ARRAY[1]
    and coalesce(s.hourly_salary, 5000) <= 5000
    and co.postal_code in (
        select o.postalcode
        from 
            btb.postal_codes i,
            btb.postal_codes o
            
        where
                i.postalcode = '71034'
            and ST_DWithin(o.point, i.point, 100000)
    )
group by s.company_id
;


explain
select distinct o.postalcode
from 
    btb.postal_codes i,
    btb.postal_codes o
    
where
        i.postalcode = '71034'
    and ST_DWithin(o.point, i.point, 10000)
    

explain
select 
    distinct s.company_id, array_agg(s.id) as supplies
from 
    btb.team_supply s
where 
    s.skills @> ARRAY[1]
group by s.company_id
;

explain
select * from btb.postal_codes
where postalcode = '22393'
;


select * 
from btb.postal_codes
limit 10
;


select 
    s.name as name,
    g.name as group
from 
    btb.skill s, btb.skillgroup g
where 
    s.skillgroup_id = g.id
;