from graphene import ID, String, ObjectType, List, Field, Decimal
from db import db_session, Company as DB_Company
from .team import Team
from .demand import Demand
from ..resolvers import teams_by_company, demands_by_company

class Location(ObjectType):
    longitude = Decimal(required=True)
    latitude = Decimal(required=True)

class Address(ObjectType):
    id = ID(required=True)

    line1 = String(required=False)
    line2 = String(required=False)
    line3 = String(required=False)

    postal_code = String(required=True)
    city = String(required=True)

    region = String(required=False)
    iso_countrycode = String(required=True)
    
    location = Field(Location, required=False)

class Company(ObjectType):
    id = ID(required=True)
    name = String(required=True)
    
    address = Field(Address, required=False)

    #country = String(required=True)
    teams = List(Team, resolver=teams_by_company)
    demands = List(Demand, resolver=demands_by_company)
