from graphene import ID, String, ObjectType
from btb.api.models import db
from sqlalchemy import text

from promise import Promise
from promise.dataloader import DataLoader

from flask import current_app, g
from .match import MatchQuery


class SupplyQuery(MatchQuery):
    def __init__(self, skills, location):
        super().__init__("btb.match_team_supply", skills, location)

    def map_result(self, record):
        return self.map_default_result("supply", g.supply_loader, record)


def match_supplies(root, info, query, cursor=None):
    match_query = SupplyQuery(query.skills, query.postal_code,)

    match_query.set_radius(query.radius)

    if cursor is not None:
        match_query.set_offset(cursor.offset)

    if query.max_salary:
        match_query.match_salary(query.max_salary)

    if query.min_quantity:
        match_query.match_quantity(query.min_quantity)

    return match_query.execute()
