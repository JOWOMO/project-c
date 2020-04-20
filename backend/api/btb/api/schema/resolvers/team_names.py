import graphene
from flask import current_app, g
from btb.api.models import db
from sqlalchemy import text
from promise import Promise
from promise.dataloader import DataLoader


def team_names(root, info):
    current_app.logger.debug("team_names")

    with db.engine.begin() as conn:
        sql = text(
            """
select 
    name
from 
    btb_data.team_name
where
    is_active = True
order by
    name
"""
        )
        result = conn.execute(sql)
        return map(
            lambda r: r.name,
            result.fetchall()
        )
