insert into btb.customer
    values (1, 'DebugUserId', 'email@email.com', 'name');

insert into btb.skill (text)
    values 
        ('Deutsch'),
        ('Vollzeit'),
        ('PKW Führerschein'),
        ('Staplerführerschein'),
        ('Kann viel stehen'),
        ('Ersthelfer'),
        ('Security')
;
    
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
        skills,
        max_hourly_wages
    )
    values (
        1,
        1,
        'Team',
        1,
        ARRAY[1,2,3],
        3000
    );


insert into btb.team_supply
    (
        id,
        company_id,
        name,
        quantity,
        skills,
        hourly_wages
    )
    values (
        1,
        1,
        'Team',
        1,
        ARRAY[1,2,3],
        3000
    );