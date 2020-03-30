from sqlalchemy import create_engine, text
from os import environ
import pathlib
import posixpath

def handler(event, context):
    engine = create_engine(environ["SQLALCHEMY_DATABASE_URI"])
    stage = environ["STAGE"] if "STAGE" in environ else "dev"

    # connection = engine.connect()

    files = [
        '../../pgsql/schema.pgsql',
        '../../pgsql/postalcodes.pgsql',
        '../../pgsql/real-data.pgsql',
    ]

    with engine.begin() as conn:

        for filename in files:
            path = posixpath.join(pathlib.Path(__file__).parent.absolute(), filename)
            print ("processing", path)

            file = open(path, "r") 
            sql = file.read() 

            sql = sql.replace("lambda_b2b_dev", "lambda_b2b_{}".format(stage))

            result = conn.execute(sql)
