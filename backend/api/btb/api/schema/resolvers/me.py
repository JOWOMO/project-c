import graphene
from flask import g, current_app
from btb.api.models import db
from sqlalchemy import text
from promise import Promise
from promise.dataloader import DataLoader

class MeLoader(DataLoader):
    def batch_load_fn(self, keys):
        # current_app.logger.debug('MeLoader', keys)

        with db.engine.begin() as conn:
            sql = text("select * from btb.customer where external_id = any(:keys)")
            data = conn.execute(sql, keys=keys)

            d = {str(i["external_id"]): i for i in data}

            # must return result in same order
            return Promise.resolve([d.get(str(id), None) for id in keys])


def me(root, info):
    current_app.logger.debug("me")

    meRecord = g.me_loader.load(g.principal.get_id())
    return meRecord.then(
        lambda m: {
            **m,
            "external_id": g.principal.get_id(),
            "email": g.principal.get_email(),
        }
    )
