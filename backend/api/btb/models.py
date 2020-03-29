from sqlalchemy import Table

from flask import current_app
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def get_table(name):
    return Table(name, db.metadata, schema="btb", autoload=True, autoload_with=db.engine)

