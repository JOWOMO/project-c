SET ROLE 'lambda_b2b_dev';

-- we keep btb_data
DROP SCHEMA IF EXISTS btb_data CASCADE;

-- this is recreated every time
DROP SCHEMA IF EXISTS btb CASCADE;
