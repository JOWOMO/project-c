create or replace function btb.lipsum( quantity_ integer ) returns character varying
    language plpgsql
    as $$
  declare
    words_       text[];
    returnValue_ text := '';
    random_      integer;
    ind_         integer;
  begin
  words_ := array['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'a', 'ac', 'accumsan', 'ad', 'aenean', 'aliquam', 'aliquet', 'ante', 'aptent', 'arcu', 'at', 'auctor', 'augue', 'bibendum', 'blandit', 'class', 'commodo', 'condimentum', 'congue', 'consequat', 'conubia', 'convallis', 'cras', 'cubilia', 'cum', 'curabitur', 'curae', 'cursus', 'dapibus', 'diam', 'dictum', 'dictumst', 'dignissim', 'dis', 'donec', 'dui', 'duis', 'egestas', 'eget', 'eleifend', 'elementum', 'enim', 'erat', 'eros', 'est', 'et', 'etiam', 'eu', 'euismod', 'facilisi', 'facilisis', 'fames', 'faucibus', 'felis', 'fermentum', 'feugiat', 'fringilla', 'fusce', 'gravida', 'habitant', 'habitasse', 'hac', 'hendrerit', 'himenaeos', 'iaculis', 'id', 'imperdiet', 'in', 'inceptos', 'integer', 'interdum', 'justo', 'lacinia', 'lacus', 'laoreet', 'lectus', 'leo', 'libero', 'ligula', 'litora', 'lobortis', 'luctus', 'maecenas', 'magna', 'magnis', 'malesuada', 'massa', 'mattis', 'mauris', 'metus', 'mi', 'molestie', 'mollis', 'montes', 'morbi', 'mus', 'nam', 'nascetur', 'natoque', 'nec', 'neque', 'netus', 'nibh', 'nisi', 'nisl', 'non', 'nostra', 'nulla', 'nullam', 'nunc', 'odio', 'orci', 'ornare', 'parturient', 'pellentesque', 'penatibus', 'per', 'pharetra', 'phasellus', 'placerat', 'platea', 'porta', 'porttitor', 'posuere', 'potenti', 'praesent', 'pretium', 'primis', 'proin', 'pulvinar', 'purus', 'quam', 'quis', 'quisque', 'rhoncus', 'ridiculus', 'risus', 'rutrum', 'sagittis', 'sapien', 'scelerisque', 'sed', 'sem', 'semper', 'senectus', 'sociis', 'sociosqu', 'sodales', 'sollicitudin', 'suscipit', 'suspendisse', 'taciti', 'tellus', 'tempor', 'tempus', 'tincidunt', 'torquent', 'tortor', 'tristique', 'turpis', 'ullamcorper', 'ultrices', 'ultricies', 'urna', 'ut', 'varius', 'vehicula', 'vel', 'velit', 'venenatis', 'vestibulum', 'vitae', 'vivamus', 'viverra', 'volutpat', 'vulputate'];
    for ind_ in 1 .. quantity_ loop
      ind_ := ( random() * ( array_upper( words_, 1 ) - 1 ) )::integer + 1;
      returnValue_ := returnValue_ || ' ' || words_[ind_];
    end loop;
    return returnValue_;
  end;
$$;

drop table if exists temp_uuid;
create table temp_uuid 
(
    id integer,
    uuid_key uuid
);

insert into temp_uuid
select
    id,
    uuid_generate_v4()
from 
    generate_series(1,100000) id
;

-- select uuid_generate_v4(), uuid_generate_v4(), uuid_generate_v4()
insert into btb_data.customer (id, external_id, email, first_name, last_name)
    values 
    ('5dccd739-825b-40bb-9012-ee583de29cda', 'DebugUserId', 'no-reply@example.com', 'Entwickler', 'Vue'),
    ('f5040327-0a2f-4ee5-b6ee-6e3f061bed25', 'DebugUserId2', 'no-reply2@example.com', 'Max', 'Mustermann'),
    ('d5040327-0a2f-4ee5-b6ee-6e3f061bed26', 'DebugUserId3', 'no-reply3@example.com', 'Lisa', 'Musterfrau')
;

insert into btb_data.company
    (
        id,
        name,
        address_line1,
        postal_code,
        city,
        industry_id
    )
select
    uuid_key, 
    'Mustermann ' || id || ' GmbH',  
    'Musterstraße ' || id,
    (
        SELECT postalcode
        FROM
            btb_data.postalcodes OFFSET id
        LIMIT 1
    ),
    'Ort',
    (
        SELECT id
        FROM btb_data.industry 
        where uuid_key = uuid_key
        OFFSET floor(random() * (
                SELECT COUNT(*) FROM btb_data.industry)
            )
        LIMIT 1
    )
from 
    temp_uuid
;

update btb_data.company 
set city = (
    select placename
    from btb_data.postalcodes p
    where p.postalcode = postal_code
    limit 1
)
;

insert into btb_data.company_customer (company_id, customer_id)
select
    uuid_key,
    '5dccd739-825b-40bb-9012-ee583de29cda'
from 
    temp_uuid
limit 2
;

insert into btb_data.company_customer(company_id, customer_id)
select
    uuid_key,
    'f5040327-0a2f-4ee5-b6ee-6e3f061bed25'
from 
   temp_uuid
offset 2
limit 49997
;

insert into btb_data.company_customer (company_id, customer_id)
select
    uuid_key,
    'd5040327-0a2f-4ee5-b6ee-6e3f061bed26'
from 
    temp_uuid
offset 50000
;

insert into btb_data.team_demand
(
    company_id,
    name,
    quantity,
    skills,
    max_hourly_salary,
    description_ext
)
select
    uuid_key,
    'Bedarf ' || temp_uuid.id,
    3,
    (
        select array_agg(match_id)
        from 
        (
            SELECT match_id
            FROM btb_data.skill 
            where uuid_key = uuid_key
            OFFSET floor(random() * (
                    SELECT COUNT(*) FROM btb_data.skill)
                )
            LIMIT floor(random() * 10 / 2)
        ) sk
    ),
    floor(random() * 10000),
    case 
        when random() * 10 <= 5 then null 
        else btb.lipsum((random() * 100)::integer)
    end
from temp_uuid
;

insert into btb_data.team_supply
(
    company_id,
    name,
    quantity,
    skills,
    hourly_salary,
    description_ext
)
select
    uuid_key,
    'Versorgung ' || temp_uuid.id,
    3,
    (
        select array_agg(match_id)
        from 
        (
            SELECT match_id
            FROM btb_data.skill 
            where uuid_key = uuid_key
            OFFSET floor(random() * (SELECT COUNT(*) FROM btb_data.skill))
            LIMIT floor(random() * 10 / 2)
        ) sk
    ),
    floor(random() * 10000),
    case 
        when random() * 10 <= 5 then null 
        else btb.lipsum((random() * 100)::integer)
    end
from 
    temp_uuid
;

drop function btb.lipsum;
drop table temp_uuid;