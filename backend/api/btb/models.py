from sqlalchemy import Table
from btb import db


def get_table(name):
    return Table(name, db.metadata, autoload=True, autoload_with=db.engine)
