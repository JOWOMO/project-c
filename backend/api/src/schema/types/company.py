from graphene import ID, String, ObjectType, List
from db import db_session, Company as DB_Company
from .team import Team
from .demand import Demand
from ..resolvers import teams_by_company, demands_by_company

class Company(ObjectType):
    id = ID(required=True)
    name = String(required=True)
    
    line1 = String(required=False)
    line2 = String(required=False)
    line3 = String(required=False)

    postal_code = String(required=True)
    city = String(required=True)

    #country = String(required=True)
    teams = List(Team, resolver=teams_by_company)
    demands = List(Demand, resolver=demands_by_company)
