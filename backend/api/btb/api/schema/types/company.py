from graphene import ID, String, ObjectType, List, Field, Float, Int, NonNull
from btb.api.schema.resolvers import demands_by_company, supplies_by_company, company_by_id
from .skills import Skill
from flask import g

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
    supplies = List(lambda: Supply, resolver=supplies_by_company)

class Demand(ObjectType):
    id = ID(required=True)
    name = String(required=True)
    description = String(required=False)
    
    skills = List(NonNull(Skill), required=False)

    quantity = Int(required=True)
    max_hourly_salary = Float(required=False)
    company = Field(lambda: Company, required=True, resolver=company_by_id)

    def resolve_skills(root, info):
        if root.skills is None:
            return []

        return g.skill_loader.load_many(root.skills)

class Supply(ObjectType):
    id = ID(required=True)
    name = String(required=True)
    description = String(required=False)

    skills = List(NonNull(Skill), required=False)

    quantity = Int(required=True)
    hourly_salary = Float(required=False)
    company = Field(lambda: Company, required=True, resolver=company_by_id)

    def resolve_skills(root, info):
        if root.skills is None:
            return []

        return g.skill_loader.load_many(root.skills)
