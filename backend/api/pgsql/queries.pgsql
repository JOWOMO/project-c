
  -- To enforce index usage because we have only 2 records for this test... 
SET enable_seqscan TO off;

update btb.company
set industry_id = (
  select greatest(1, floor(random() * 10)) where id = id
)

update btb.company
set city = (
    SELECT placename
    FROM
        btb.postalcodes OFFSET id
    LIMIT 1
)


update btb.company 
set city = (
    select placename
    from btb.postalcodes p
    where p.postalcode = postal_code
    limit 1
)
;