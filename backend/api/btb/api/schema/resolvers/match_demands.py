from graphene import ID, String, ObjectType
from btb.api.models import db
from sqlalchemy import text

from promise import Promise
from promise.dataloader import DataLoader

from flask import current_app, g
from .match import MatchQuery


class DemandQuery(MatchQuery):
    def __init__(self, skills, location):
        super().__init__("btb.match_team_demand", skills, location)

    def map_result(self, record, orderby):
        return self.map_default_result("demand", g.demand_loader, record, orderby)


def match_demand(demand, radius=None, cursor = None):
    match_query = DemandQuery(demand.skills, demand.postal_code)
    match_query.set_radius(radius)

    if cursor is not None:
        match_query.set_offset(cursor.offset)

    if demand.max_hourly_salary:
        match_query.match_salary(demand.max_hourly_salary)

    if demand.quantity:
        match_query.match_quantity(demand.quantity)

    return match_query.execute()


def match_demand_by_id(root, info, id, radius=None, cursor=None):
    with db.engine.begin() as conn:
        sql = text("select d.*, c.postal_code from btb_data.team_demand d, btb_data.company c where d.company_id = c.id and d.id = :id")
        data = conn.execute(sql, id=id).fetchone()

        for row in data:
            return match_demand(data, radius, cursor)

        return {
            "page_info": {
                "has_next_page": False,
            },
            "matches": [],
        }


def match_demands_by_query(root, info, query, cursor=None):
    match_query = DemandQuery(query.skills, query.postal_code,)

    match_query.set_radius(query.radius)

    if cursor is not None:
        match_query.set_offset(cursor.offset)

    if query.max_salary:
        match_query.match_salary(query.max_salary)

    if query.min_quantity:
        match_query.match_quantity(query.min_quantity)

    return match_query.execute()
