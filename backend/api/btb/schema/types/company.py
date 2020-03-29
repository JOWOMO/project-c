from graphene import ID, String, ObjectType, List, Field, Float, Int, NonNull
from btb.schema.resolvers import demands_by_company, supply_by_company, company_by_id

class Company(ObjectType):
    id = ID(required=True)
    name = String(required=True)

    street1 = String(required=False)
    street2 = String(required=False)
    street3 = String(required=False)

    postal_code = String(required=True)
    city = String(required=True)

    # lazy 
    demands = List(lambda: Demand, resolver=demands_by_company)
    supplies = List(lambda: Supply, resolver=supply_by_company)

class Demand(ObjectType):
    id = ID(required=True)
    name = String(required=True)
    description = String(required=False)

    tags = List(NonNull(String), required=False)

    amount = Int(required=True)
    max_salary = Float(required=False)
    company = Field(lambda: Company, required=True, resolver=company_by_id)

class Supply(ObjectType):
    id = ID(required=True)
    name = String(required=True)
    description = String(required=False)

    tags = List(NonNull(String), required=False)

    amount = Int(required=True)
    max_salary = Float(required=False)
    company = Field(lambda: Company, required=True)
