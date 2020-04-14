import graphene
from flask import current_app, g
from btb.api.models import db
from sqlalchemy import text
from promise import Promise
from promise.dataloader import DataLoader


class SkillLoader(DataLoader):
    def batch_load_fn(self, keys):
        current_app.logger.debug("load %s", keys)

        with db.engine.begin() as conn:
            sql = text(
                """
select 
    s.id as id,
    s.match_id as match_id,
    s.name as name,
    g.name as group
from 
    btb_data.skill s, btb_data.skill_group g
where 
        s.skill_group_id = g.id
    and s.match_id = any(:keys)
    and s.is_active = True
    and g.is_active = True
"""
            )
            data = conn.execute(sql, keys=list(map(lambda k: int(k), keys)))

            d = {str(i["match_id"]): i for i in data}

            # must return result in same order
            return Promise.resolve([d.get(str(id), None) for id in keys])

def map_skills(conn, ids):
    sql = text("""select array_agg(match_id) as ids from btb_data.skill where id = any(cast(:ids as uuid[]))""")

    data = conn.execute(sql, ids=ids)
    return next(data).ids


def skills(root, info):
    current_app.logger.debug("skills")

    with db.engine.begin() as conn:
        sql = text(
            """
select 
    s.id as id,
    s.name as name,
    g.name as group
from 
    btb_data.skill s, btb_data.skill_group g
where 
    s.skill_group_id = g.id
and s.is_active = True
and g.is_active = True
"""
        )
        result = conn.execute(sql)
        return result.fetchall()
