
from graphene import ID, String, ObjectType
from btb.models import db
from sqlalchemy import text

from promise import Promise
from promise.dataloader import DataLoader

from flask import current_app, g
pagesize = 10

def match(root, info, query, cursor = None):
    conditions = []
    params = {"principal": g.principal.get_id()}

    # skill parameter
    if query.skills:
        conditions.append("and s.skills @> :skills")
        params["skills"] = query.skills
    else:
        conditions.append('')

    # radius query
    if query.postal_code and query.radius:
        conditions.append(
            """
and co.postal_code in (
    select o.postalcode
    from 
        btb.postal_codes i,
        btb.postal_codes o
        
    where
            i.postalcode = :postal_code
        and ST_DWithin(o.point, i.point, :radius)
)
"""
        )
        params["postal_code"] = query.postal_code
        params["radius"] = query.radius * 1000
    else:
        conditions.append('')

    if query.max_salary:
        conditions.append("and coalesce(s.hourly_salary, :max_salary) <= :max_salary")
        params["max_salary"] = query.max_salary
    else:
        conditions.append('')

    conditions.append("limit {} offset :offset".format(pagesize + 1))
    if cursor is not None:
        params["offset"] = cursor.offset
    else:
        params["offset"] = 0
        
    with db.engine.begin() as conn:
        result = conn.execute(
            text(
                """
select 
    distinct s.company_id as id, array_agg(s.id) as supplies
from 
    btb.team_supply s, 
    btb.company co,

    btb.company_customer cu,
    btb.customer u
where 
    -- company for supply
        s.company_id = co.id
    and cu.company_id = s.company_id
    
    -- user condition
    and cu.customer_id = u.id
    and u.external_id <> 'abc'

    -- query
    {}
    {}
    {}
group by s.company_id
    {}
            """.format(
                    *conditions
                )
            ),
            **params
        )

        data = result.fetchall()
        nextCursor = {
            "has_next_page": False,
            "offset": params["offset"],
            "page_size": pagesize,
        }

        if len(data) > pagesize:
            data = data[:-1]
            nextCursor["has_next_page"] = True
            nextCursor["offset"] = params["offset"] + pagesize

        elif params["offset"] > 0:
            nextCursor["offset"] = params["offset"] + len(data)

        return {
            "page_info": { **nextCursor },
            "matches":  map(
                lambda row: {
                    "company": g.company_loader.load(row["id"]),
                    "supplies": g.supply_loader.load_many(row["supplies"]),
                },
                data,
            )
        }
