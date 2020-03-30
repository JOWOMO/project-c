insert into btb.skillgroup (id, name)
    values 
        (1, 'Sprachen'),
        (2, 'Führerscheine'),
        (3, 'Spezialfähigkeiten'),
        (4, 'Arbeitszeit')
on conflict do nothing;

insert into btb.skill (skillgroup_id, id, name)
    values 
        (1, 100, 'Deutsch'),

        (2, 201, 'PKW Führerschein'),
        (2, 202, 'Staplerführerschein'),

        (3, 301, 'Ersthelfer'),
        (3, 302, 'Security'),

        (4, 400, 'Vollzeit'),
        (4, 401, 'Teilzeit'),
        (4, 402, 'Nachtschicht')
on conflict do nothing;

update btb.postal_codes
    set point = ST_SetSRID(ST_MakePoint(longitude, latitude),4326)::geography
;

