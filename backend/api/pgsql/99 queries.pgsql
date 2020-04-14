
  -- To enforce index usage 
SET enable_seqscan TO off;

select uuid_generate_v4()



select * from btb_data.customer 


select * from btb_data.team_demand 
where company_id = '8bad3f7d-00f9-4ed7-ad87-b844bf75d785'

select * from btb_data.skill


select 
    s.id as id,
    s.name as name,
    g.name as group
from 
    btb_data.skill s, btb_data.skill_group g
where 
        s.skill_group_id = g.id
    and s.match_id = ANY(ARRAY[602, 601])
    and s.is_active = True
    and g.is_active = True



select * from btb_data.contact_request



select r.id as id, r.name as name, c.owner_external_id as external_id, c.contact as contact, c.postal_code as postal_code, r.name, row_to_json(r) as record
from
    btb_data.team_supply r, 
    btb.company_with_contact c
where
    r.company_id = c.id
and r.id = cast('d9a1d65e-c5a3-491f-b786-0815c6adcd86' as uuid)
and c.owner_external_id <> 'DebugUserId'
        
2020-04-14 02:32:10,700 INFO sqlalchemy.engine.base.Engine {'id': , 'external_id': 'DebugUserId'}



select r.id as id, r.name as name, c.owner_external_id as external_id, c.contact as contact, c.postal_code as postal_code, r.name, row_to_json(r) as record
from
    btb_data.team_demand r, 
    btb.company_with_contact c
where
    r.company_id = c.id
and r.id = cast('51579ab0-72d4-4cd0-98ff-7dc722d58c2f' as uuid)
and c.owner_external_id <> 'DebugUser1'
        
2020-04-14 02:42:58,400 INFO sqlalchemy.engine.base.Engine {'id': '51579ab0-72d4-4cd0-98ff-7dc722d58c2f', 'external_id': 'DebugUserId'}



select * From btb_data.team_demand
where id =
'51579ab0-72d4-4cd0-98ff-7dc722d58c2f'



select * From btb_data.team_supply
where id =
'51579ab0-72d4-4cd0-98ff-7dc722d58c2f'