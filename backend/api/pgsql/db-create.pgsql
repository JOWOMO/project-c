CREATE ROLE lambda_b2b WITH CREATEDB PASSWORD 'pass' -- change Pass

CREATE DATABASE btb
    WITH 
    OWNER = lambda_b2b
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

