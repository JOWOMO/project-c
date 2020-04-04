insert into btb.industry (id, name)
    values 
        (1, 'Unbekannt'),
        (2, 'Energie'),
        (3, 'Wasser & Entsorgung'),
        (4, 'Ernährung & Hygiene'),
        (5, 'Informationstechnik & Telekommunikation'),
        (6, 'Finanz- & Wirtschaftswesen'),
        (7, 'Transport & Verkehr'),
        (8, 'Medien'),
        (9, 'Staatliche Verwaltung'),
        (10, 'Schulen, Kinder- & Jugendhilfe, Behindertenhilfe')
on conflict do nothing;

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

insert into btb.centered_postalcodes
select postalcode, st_centroid(st_union(ST_SetSRID(ST_MakePoint(longitude, latitude),4326))) as centoid
from 
    btb.postalcodes 
group by 
    postalcode
;
