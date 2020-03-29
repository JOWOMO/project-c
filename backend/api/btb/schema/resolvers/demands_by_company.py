from graphene import ID, String, ObjectType
from flask import g
from btb.models import db, get_table
from sqlalchemy.sql import select

def demands_by_company(root, info):
    with db.engine.begin() as conn:
        demand = get_table("team_demand")

        sel = select([demand], demand.c.company_id == root["id"])
        result = conn.execute(sel)

        return result.fetchall()
