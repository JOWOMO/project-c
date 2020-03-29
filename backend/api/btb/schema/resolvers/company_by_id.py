from graphene import ID, String, ObjectType
from flask import g
from btb.models import db, get_table
from sqlalchemy.sql import select

from promise import Promise
from promise.dataloader import DataLoader

class CompanyLoader(DataLoader):
    def batch_load_fn(self, keys):

        with db.engine.begin() as conn:
            company = get_table("company")
            sel = select([company], company.c.id.in_(keys))

            result = conn.execute(sel)
            data = result.fetchall()

            d = { str(i["id"]) : i for i in data }

            # must return result in same order
            return Promise.resolve([d.get(str(id), None) for id in keys])

loader = CompanyLoader()

def company_by_id(root):
    return loader.load(root["company_id"])
    