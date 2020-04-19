
  -- To enforce index usage 
SET enable_seqscan TO off;

delete from btb_data.contact_request



select *
from 
    btb_data.contact_request r



select c.*
from 
    btb_data.contact_request r

    left join btb.match_team_demand d 
      on 
            match_type = 'supply' 
        and d.record_id = response_id
        -- response must be from calling user    
        -- and d.external_id = 'DebugUserId'
    
    left join btb.match_team_supply s
      on 
            match_type = 'demand' 
        and s.record_id = response_id
        -- response must be from calling user    
        -- and d.external_id = 'DebugUserId'

    join btb.company_with_contact c on 
      c.id = COALESCE(d.company_id, s.company_id)

where 
    r.id = 'aefac0ab-e1d9-4146-b6c0-c3342791452b'



select * from btb_data.team_supply
where id = '71bc9783-af12-4077-88d6-cca15696473d'