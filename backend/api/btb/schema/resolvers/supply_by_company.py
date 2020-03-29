from graphene import ID, String, ObjectType
from flask import g
from btb.models import db, get_table
from sqlalchemy.sql import select

def supply_by_company(root, info):
    with db.engine.begin() as conn:
        demand = get_table("team_supply")

        sel = select([demand], demand.c.company_id._in == root["id"])
        result = conn.execute(sel)

        return result.fetchall()
