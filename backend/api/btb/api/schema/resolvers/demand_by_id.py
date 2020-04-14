from graphene import ID, String, ObjectType
from btb.api.models import db
from sqlalchemy import text

from promise import Promise
from promise.dataloader import DataLoader
from flask import current_app, g


class DemandLoader(DataLoader):
    def batch_load_fn(self, keys):
        current_app.logger.debug("load %s", keys)

        with db.engine.begin() as conn:
            sql = text("select * from btb_data.team_demand where id = any(cast(:keys as uuid[]))")
            data = conn.execute(sql, keys=keys)
            
            d = {str(i["id"]): i for i in data}

            # must return result in same order
            return Promise.resolve([d.get(str(id), None) for id in keys])


def demand_by_id(root, info, id=None):
    id = root["id"] if id is None else id
    current_app.logger.debug("demand_by_id", id)

    return g.demand_loader.load(id)
