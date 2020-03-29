from graphene import ID, String, ObjectType
from btb.models import db
from sqlalchemy import text

from promise import Promise
from promise.dataloader import DataLoader

from flask import current_app, g

def match(root, info, query):
    with db.engine.begin() as conn:

        result = conn.execute(
            text(
                """
select 
    distinct s.company_id as id, array_agg(s.id) as supplies
from 
    btb.team_supply s, 
    btb.company_customer cu,
    btb.customer c
where 
        cu.company_id = s.company_id
    and cu.customer_id = c.id
    and c.external_id <> :principal
    and s.skills @> :skills
    {}
group by s.company_id
""".format()
            ),
            skills=query.skills,
            principal=g.principal.get_id() + "debug_user"
        )

        data = result.fetchall()
        return map(
            lambda row: {
                "company": g.company_loader.load(row["id"]),
                "supplies": g.supply_loader.load_many(row["supplies"]),
            },
            data,
        )
