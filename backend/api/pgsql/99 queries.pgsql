
  -- To enforce index usage 
SET enable_seqscan TO off;

delete from btb_data.contact_request

select * from btb_data.contact_request