import graphene
from flask import g, current_app
from btb.api.models import db
from sqlalchemy import text
from promise import Promise
from promise.dataloader import DataLoader


class MeLoader(DataLoader):
    def batch_load_fn(self, keys):
        current_app.logger.debug("load %s", keys)

        with db.engine.begin() as conn:
            sql = text("select * from btb.customer where external_id = any(:keys)")
            data = conn.execute(sql, keys=keys)

            d = {str(i["external_id"]): i for i in data}

            # must return result in same order
            return Promise.resolve([d.get(str(id), None) for id in keys])


def me(root, info):
    current_app.logger.debug("me")

    meRecord = g.me_loader.load(g.principal.get_id())

    def resolve_user(user):
        if user is None:
            return {
                "id": "-1",
                "first_name": g.principal.get_first_name(),
                "last_name": g.principal.get_last_name(),
            }

        return user

    return meRecord.then(
        lambda m: {
            ** resolve_user(m),
            "external_id": g.principal.get_id(),
            "email": g.principal.get_email(),
        }
    )
