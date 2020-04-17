
  -- To enforce index usage 
SET enable_seqscan TO off;


select * from btb_data.postalcodes
where postalcode ilike '%1034%'

select * from btb_data.postalcodes
where placename ilike '%hamburg%'

select distinct length(postalcode)
from btb_data.postalcodes 