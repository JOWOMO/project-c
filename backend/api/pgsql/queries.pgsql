
  -- To enforce index usage because we have only 2 records for this test... 
SET enable_seqscan TO off;

explain
select 
    distinct s.company_id, array_agg(s.id) as supplies
from 
    btb.team_supply s, 
    btb.company_customer cu,
    btb.customer c
where 
        cu.company_id = s.company_id
    and cu.customer_id = c.id
    and c.external_id <> 'abc'
    and s.skills @> ARRAY[1]
group by s.company_id
;


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