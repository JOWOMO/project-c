insert into btb.customer
    values (1, 'DebugUserId', 'email@email.com', 'name');

insert into btb.company
    (
        id,
        name,
        address_line1,
        postal_code,
        city
    )
    values (
        1, 
        'Company',
        'Line 1',
        '71034',
        'Böblingen'
    );
    
insert into btb.company_user
    values (1, 1);


insert into btb.team_demand
    (
        id,
        company_id,
        name,
        quantity,
        tags
    )
    values (
        1,
        1,
        'Team',
        1,
        ARRAY['t1', 't2', 't3']
    );