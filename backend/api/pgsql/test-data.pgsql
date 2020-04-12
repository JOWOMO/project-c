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

insert into btb.customer (id, external_id, email, first_name, last_name)
    values 
    (1, 'DebugUserId', 'email@email.com', 'Entwickler', 'Vue'),
    (2, 'DebugUserId2', 'email2@email.com', 'Max', 'Mustermann'),
    (3, 'DebugUserId3', 'email3@email.com', 'Lisa', 'Musterfrau')
;

insert into btb.company
    (
        id,
        name,
        address_line1,
        postal_code,
        city,
        industry_id
    )
select
    id, 
    'Mustermann ' || id || ' GmbH',  
    'Musterstraße ' || id,
    (
        SELECT postalcode
        FROM
            btb.postalcodes OFFSET id
        LIMIT 1
    ),
    'Ort',
    (
        select greatest(1, floor(random() * 10)) 
        where id = id
    )
from 
    generate_series(1,100000) id
;

update btb.company 
set city = (
    select placename
    from btb.postalcodes p
    where p.postalcode = postal_code
    limit 1
)
;

insert into btb.company_customer (company_id, customer_id)
select
    id,
    1
from 
    generate_series(1, 2) id
;

insert into btb.company_customer(company_id, customer_id)
select
    id,
    2
from 
    generate_series(3, 50000) id
;

insert into btb.company_customer (company_id, customer_id)
select
    id,
    3
from 
    generate_series(50001, 100000) id
;

insert into btb.team_demand
(
    company_id,
    name,
    quantity,
    skills,
    max_hourly_salary,
    description_ext
)
select
    company_id,
    'Bedarf ' || company_id,
    3,
    (
        select array_agg(id)
        from 
        (
            SELECT id
            FROM btb.skill 
            where company_id = company_id
            OFFSET floor(random() * (
                    SELECT COUNT(*) FROM btb.skill)
                )
            LIMIT floor(random() * 5)
        ) sk
    ),
    floor(random() * 10000),
    case 
        when random() * 10 <= 5 then null 
        else btb.lipsum((random() * 100)::integer)
    end
from generate_series(1, 100000) company_id
;

insert into btb.team_supply
(
    company_id,
    name,
    quantity,
    skills,
    hourly_salary,
    description_ext
)
select
    company_id,
    'Versorgung ' || company_id,
    3,
    (
        select array_agg(id)
        from 
        (
            SELECT id
            FROM btb.skill 
            where company_id = company_id
            OFFSET floor(random() * (SELECT COUNT(*) FROM btb.skill))
            LIMIT floor(random() * 5)
        ) sk
    ),
    floor(random() * 10000),
    case 
        when random() * 10 <= 5 then null 
        else btb.lipsum((random() * 100)::integer)
    end
from 
    generate_series(1, 100000) company_id
;

drop function btb.lipsum;