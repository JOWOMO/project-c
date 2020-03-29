import graphene
from flask import current_app, g
from btb.models import db
from sqlalchemy import text
from promise import Promise
from promise.dataloader import DataLoader

class SkillLoader(DataLoader):
    def batch_load_fn(self, keys):

        with db.engine.begin() as conn:
            sql = text('select * from btb.skill where id = any(:keys)')
            data = conn.execute(sql, keys=list(map(lambda k: int(k), keys)))

            d = { str(i["id"]) : i for i in data }

            # must return result in same order
            return Promise.resolve([d.get(str(id), None) for id in keys])

def skills(root, info):
    current_app.logger.debug('skills')

    with db.engine.begin() as conn:
        sql = text("select * from btb.skill")
        result = conn.execute(sql)
        
        return result.fetchall()
