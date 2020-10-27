
-- create database dev;

CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS intarray;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE ROLE lambda_b2b_dev;

GRANT ALL PRIVILEGES ON DATABASE dev TO lambda_b2b_dev;
REVOKE ALL PRIVILEGES ON database dev FROM public;

GRANT lambda_b2b_dev to postgres;

-- create database test;
-- CREATE EXTENSION if not exists postgis;

-- CREATE ROLE lambda_b2b_test;

-- GRANT ALL PRIVILEGES ON DATABASE test TO lambda_b2b_test;
-- REVOKE ALL PRIVILEGES ON database test FROM public;

-- GRANT lambda_b2b_test to postgres;


-- create database prod;
-- CREATE EXTENSION if not exists postgis;

-- CREATE ROLE lambda_b2b_prod;

-- GRANT ALL PRIVILEGES ON DATABASE prod TO lambda_b2b_prod;
-- REVOKE ALL PRIVILEGES ON database prod FROM public;

-- GRANT lambda_b2b_prod to postgres;
