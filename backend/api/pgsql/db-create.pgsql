CREATE ROLE lambda_b2b;
GRANT lambda_b2b to postgres;

-- drop database dev;
CREATE DATABASE dev
    WITH OWNER = lambda_b2b
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    CONNECTION LIMIT = -1
;

