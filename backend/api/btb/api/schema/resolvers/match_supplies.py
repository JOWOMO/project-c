from graphene import ID, String, ObjectType
from btb.api.models import db
from sqlalchemy import text

from promise import Promise
from promise.dataloader import DataLoader

from flask import current_app, g
from .match import MatchQuery

from .match_queries import match_demand, SupplyQuery

def match_supply_by_id(root, info, id, radius=None, cursor=None):
    with db.engine.begin() as conn:
        sql = text("""
select 
    s.*, 
    s.hourly_salary as max_hourly_salary,
    c.postal_code 
from 
    btb_data.team_supply s, 
    btb.company_with_contact c 
where 
    s.company_id = c.id 
and s.id = :id
and c.owner_external_id = :uid
        """)

        data = conn.execute(
            sql, 
            uid=g.principal.get_id(), 
            id=id
        ).fetchone()

        if data is not None:
            for row in data:
                return match_demand(data, radius, cursor) # find matching demands

        return {
            "page_info": {
                "page_size": 0,
                "has_next_page": False,
            },
            "matches": [],
        }   


def match_supplies_by_query(root, info, query, cursor=None):
    match_query = SupplyQuery(query.skills, query.postal_code,)

    match_query.set_radius(query.radius)

    if cursor is not None:
        match_query.set_offset(cursor.offset)

    if query.max_salary:
        match_query.match_salary(query.max_salary)

    if query.min_quantity:
        match_query.match_quantity(query.min_quantity)

    return match_query.execute()
