
  -- To enforce index usage 
SET enable_seqscan TO off;

explain
select 
  icount(skills & ARRAY[400, 401, 402]) as matchingskills,
  st_distance(point, btb.get_postalcode_position('01945')) as distance,
  2480 - hourly_salary as diffsalary,
  3 - quantity as diffquantity,record_id
from btb.match_team_demand
WHERE 
  skills && ARRAY[400, 401, 402]
and st_dwithin(point, btb.get_postalcode_position('01945'), 30000) 
and external_id <> 'DebugUserId'
order by 
  1 desc,
  4 desc,
  point <-> btb.get_postalcode_position('01945'),
  company_name
limit 11 
offset 0
              