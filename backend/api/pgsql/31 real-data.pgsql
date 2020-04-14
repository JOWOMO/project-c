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
    ('Fachkenntnisse'),
    ('Fachwissen'),
    ('Führerscheine'),
    ('Krise'),
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
    (get_skill_group('Arbeitszeit'), 100, 'Nachtschicht'),
    (get_skill_group('Arbeitszeit'), 101, 'Teilzeit'),
    (get_skill_group('Arbeitszeit'), 102, 'Vollzeit'),
    (get_skill_group('Fachkenntnisse'), 200, 'Abrechnung / Kasse'),
    (get_skill_group('Fachkenntnisse'), 201, 'Fertigung'),
    (get_skill_group('Fachkenntnisse'), 202, 'Handwerk'),
    (get_skill_group('Fachkenntnisse'), 203, 'Medizinisches Fachwissen '),
    (get_skill_group('Fachkenntnisse'), 204, 'Service '),
    (get_skill_group('Fachkenntnisse'), 205, 'Verkauf'),
    (get_skill_group('Fachwissen'), 300, 'Microsoft Office'),
    (get_skill_group('Führerscheine'), 400, 'LKW Führerschein'),
    (get_skill_group('Führerscheine'), 401, 'PKW Führerschein'),
    (get_skill_group('Führerscheine'), 402, 'Staplerführerschein'),
    (get_skill_group('Krise'), 500, 'Körperliche Arbeit'),
    (get_skill_group('Krise'), 501, 'Kundenkontakt'),
    (get_skill_group('Spezialwissen'), 600, 'Ersthelfer'),
    (get_skill_group('Spezialwissen'), 601, 'Hygienzertifikat'),
    (get_skill_group('Spezialwissen')   , 602, 'Küche')
on conflict do nothing;

drop function get_skill_group;

insert into btb_data.team_name (name)
    values
    ('Altenpfleger'),
    ('Bäcker'),
    ('Bauarbeiter'),
    ('Betriebswirt/Fachkraft Buchhaltung'),
    ('Elektroniker'),
    ('Eventmanager'),
    ('Fachkraft Energie, Kreislauf- & Abfallwirtschaft'),
    ('Fachkraft Gastronomie'),
    ('Fachkraft Gestaltung/Design'),
    ('Fachkraft Holz- & Metallverarbeitung'),
    ('Fachkraft Hotelgewerbe'),
    ('Fachkraft Informationstechnik/Telekommunikation'),
    ('Fachkraft Kosmetik'),
    ('Fachkraft Kunststoffe & Chemie'),
    ('Fachkraft Lebensmittelprüfung/-verarbeitung'),
    ('Fachkraft Pflege'),
    ('Fachkraft Postdiensleistungen'),
    ('Fachkraft Sport/Fitnees'),
    ('Fachkraft Sprachdienstleistungen'),
    ('Fachkraft Versicherung'),
    ('Fachkraft Vertrieb'),
    ('Fachkraft Verwaltung'),
    ('Friseur'),
    ('Handwerker'),
    ('Ingenieur'),
    ('Koch'),
    ('Konstrukteur'),
    ('Kraftfahrer'),
    ('Laborant'),
    ('Lagerarbeiter'),
    ('Logistiker'),
    ('Mechaniker'),
    ('Mechatroniker'),
    ('Medizinische Assistenz'),
    ('Pädagogische Assistenz'),
    ('Redakteur'),
    ('Sanitäter'),
    ('Sicherheitspersonal'),
    ('Techniker'),
    ('Technische Assistenz '),
    ('Verkäufer')
on conflict do nothing;

insert into btb_data.centered_postalcodes
select postalcode, st_centroid(st_union(ST_SetSRID(ST_MakePoint(longitude, latitude),4326))) as centoid
from 
    btb_data.postalcodes 
group by 
    postalcode
;
