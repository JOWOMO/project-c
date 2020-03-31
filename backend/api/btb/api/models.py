from flask import current_app
from sqlalchemy import create_engine, text
from sqlalchemy.pool import NullPool


class DB:
    def init_app(self, app):
        url = app.config["SQLALCHEMY_DATABASE_URI"]

        # lambda uses a single container per request model
        # we do the pooling via pgbouncer
        self.engine = create_engine(url, echo=app.debug, poolclass=NullPool)


db = DB()
