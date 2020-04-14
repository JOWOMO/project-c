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

    def map_result(self, record, orderby):
        return self.map_default_result("supply", g.supply_loader, record, orderby)


def match_supply(supply, radius=None, cursor = None):
    match_query = SupplyQuery(supply['skills'], supply.postal_code)
    match_query.set_radius(radius)

    if cursor is not None:
        match_query.set_offset(cursor.offset)

    if "hourly_salary" in supply:
        match_query.match_salary(supply["hourly_salary"])

    if "quantity" in supply:
        match_query.match_quantity(supply["quantity"])

    return match_query.execute()


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