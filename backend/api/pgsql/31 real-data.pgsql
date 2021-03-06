insert into btb_data.industry (name)
    values 
    ('Bau'),
    ('Einzelhandel'),
    ('Gastronomie'),
    ('Gesundheitswesen'),
    ('Handwerk'),
    ('Industrie/Produktion'),
    ('Informationstechnik & Telekommunikation'),
    ('Kultur- und Kreativwirtschaft'),
    ('Landwirtschaft'),
    ('Logistik, Transport, Verkehr'),
    ('Öffentliche Dienstleistungen'),
    ('Tourismus '),
    ('Unternehmensdienstleistungen')
on conflict do nothing;

insert into btb_data.skill_group (name)
    values 
    ('Arbeitszeit'),
    ('Organisation'),
    ('Fachkenntnisse'),
    ('Fachwissen'),
    ('Führerscheine'),
    ('Krise'),
    ('Mobilität'),
    ('Spezialwissen')
on conflict do nothing;

CREATE FUNCTION get_skill_group(text) RETURNS uuid
    AS '
select id
from 
    btb_data.skill_group
where
    name = $1
'
    LANGUAGE SQL
    IMMUTABLE
    RETURNS NULL ON NULL INPUT
;

insert into btb_data.skill (skill_group_id, match_id, name)
    values 
    (get_skill_group('Arbeitszeit'), 101, 'Vollzeit'),
    (get_skill_group('Arbeitszeit'), 102, 'Teilzeit'),
    (get_skill_group('Arbeitszeit'), 103, 'Minijob'),
    -- (get_skill_group('Arbeitszeit'), 104, 'Nachtschicht'),

    (get_skill_group('Fachkenntnisse'), 301, 'Fertigung'),
    (get_skill_group('Fachkenntnisse'), 302, 'Handwerk'),
    (get_skill_group('Fachkenntnisse'), 303, 'Service'),
    (get_skill_group('Fachkenntnisse'), 304, 'Verkauf'),
    (get_skill_group('Fachkenntnisse'), 305, 'Abrechnung / Kasse'),
    (get_skill_group('Fachkenntnisse'), 306, 'Microsoft Office'),

    (get_skill_group('Führerscheine'), 400, 'LKW Führerschein'),
    (get_skill_group('Führerscheine'), 401, 'PKW Führerschein'),
    (get_skill_group('Führerscheine'), 402, 'Staplerführerschein'),

    (get_skill_group('Krise'), 500, 'Körperliche Arbeit'),
    (get_skill_group('Krise'), 501, 'Kundenkontakt'),
    (get_skill_group('Krise'), 502, 'Deutsch (mindestens B2)'),

    (get_skill_group('Spezialwissen'), 701, 'Ersthelfer'),
    (get_skill_group('Spezialwissen'), 702, 'Hygienezertifikat'),
    (get_skill_group('Spezialwissen'), 703, 'Medizinische Kenntnisse'),
    (get_skill_group('Spezialwissen'), 704, 'Küche')
on conflict do nothing;

insert into btb_data.skill (skill_group_id, skill_type, match_id, hierarchy, name)
    values 
    (get_skill_group('Organisation'), 'hierarchy', 200, 3, 'Führungskraft'),
    (get_skill_group('Organisation'), 'hierarchy', 201, 2, 'Fachkraft'),
    (get_skill_group('Organisation'), 'hierarchy', 202, 1, 'Hilfskraft'),

    (get_skill_group('Mobilität'), 'hierarchy', 603, 3, 'Mobil bis 100km'),
    (get_skill_group('Mobilität'), 'hierarchy', 602, 2, 'Mobil bis 50km'),
    (get_skill_group('Mobilität'), 'hierarchy', 601, 1, 'Mobil bis 20km')
on conflict do nothing;

drop function get_skill_group;

insert into btb_data.team_name (name)
    values
    ('Pflege - Krankenhaus'),
    ('Pflege - Altenpflege'),
    ('Pflege - Sonstige'),
    ('Büro/Verwaltung/Administration'),
    ('Buchhaltung/Controlling'),
    ('Sonstige kaufmännische Tätigkeiten'),
    ('Energie, Kreislauf- & Abfallwirtschaft'),
    ('Zubereitung Speisen/Backwaren'),
    ('Service'),
    ('Küche'),
    ('Kosmetik/Fußpflege'),
    ('Informationstechnik/Telekommunikation'),
    ('Kunststoff/Chemie'),
    ('Elektroniktechnik/Mechatronik'),
    ('Holzverarbeitung'),
    ('Metallverarbeitung'),
    ('Logistik - Beschaffung'),
    ('Logistik - Berufskraftfahrer/in'),
    ('Logistik - Lager'),
    ('Logistik - Zustellung/Fahrdienst'),
    ('Dolmetschen/Übersetzen'),
    ('Versicherung'),
    ('Vertrieb/Verkauf'),
    ('Friseure/innen'),
    ('Reinigung'),
    ('Eventlogistik/Eventmanagement'),
    ('Konstrukteure/innen'),
    ('Mechaniker/innen'),
    ('Lehrkraft/Dozenten'),
    ('Erziehung'),
    ('Medizinische Assistenz'),
    ('Journalisten/innen'),
    ('Rettungs-/Sanitätsdienst'),
    ('Sicherheitspersonal'),
    ('Technik'),
    ('Labor'),
    ('Therapeuten/innen'),
    ('Gestaltung/Design'),
    ('Projektmanagement')
on conflict do nothing;

-- wipe data
truncate table btb_data.centered_postalcodes;

insert into btb_data.centered_postalcodes
select postalcode, st_centroid(st_union(ST_SetSRID(ST_MakePoint(longitude, latitude),4326))) as centoid
from 
    btb_data.postalcodes 
group by 
    postalcode
;
