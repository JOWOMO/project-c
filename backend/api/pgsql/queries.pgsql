
  -- To enforce index usage because we have only 2 records for this test... 
SET enable_seqscan TO off;


explain
select 
    array_length(skills & ARRAY[201, 301], 1) as matchingskills,
    st_distance(point, btb.get_postalcode_position('22049')) as distance,
    5000 - hourly_salary as diffsalary,

    10 - quantity as diffquantity,
    company_id,
    record_id
from 
    btb.match_team_demand
WHERE
        array_length(skills & ARRAY[201, 301], 1) > 0 -- must have skills in common
    and st_dwithin(point, btb.get_postalcode_position('22049'), 10000) -- musst fall within range
    and external_id <> 'DebugUserId1'
order by     
    1 desc, -- by number of matching skills
    point <-> btb.get_postalcode_position('22049'), -- nearer is better
    3 desc, -- greater diff > 0 means cheaper, diff < 0 means expensive
    company_name -- if everything is equals by name
limit 10


select * 
from btb.company 


select array[0] & array [1]