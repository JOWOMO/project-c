set DISABLE_MATCH_OWNER_CHECK=true 
set SQLALCHEMY_DATABASE_URI=postgresql://postgres:postgres@localhost/dev
set FLASK_ENV=development
set FLASK_APP=btb.api 

poetry run flask run