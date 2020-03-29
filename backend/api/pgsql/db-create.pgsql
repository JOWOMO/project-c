CREATE ROLE lambda_b2b;
GRANT ALL PRIVILEGES ON DATABASE dev TO lambda_b2b;

GRANT lambda_b2b to postgres;

CREATE EXTENSION if not exists postgis; 
-- drop database dev;
-- CREATE DATABASE dev
--     WITH OWNER = lambda_b2b
--     ENCODING = 'utf8'
--     LC_COLLATE = 'en_US.utf8'
--     LC_CTYPE = 'en_US.utf8'
--     CONNECTION LIMIT = -1
-- ;

