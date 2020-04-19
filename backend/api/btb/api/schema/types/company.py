from graphene import ID, String, ObjectType, List, Field, Float, Int, NonNull, Boolean
from btb.api.schema.resolvers import (
    demands_by_company,
    supplies_by_company,
    company_by_id,
)
from .skills import Skill
from flask import g
from .industry import Industry

class CompanyContact(ObjectType):
    id = ID(required=True)
    first_name = String(required=True)
    last_name = String(required=True)

    picture_url = String(required=False)
    

class Company(ObjectType):
    id = ID(required=True)
    name = String(required=True)

    address_line1 = String(required=False)
    address_line2 = String(required=False)
    address_line3 = String(required=False)

    postal_code = String(required=True)
    city = String(required=True)

    industry = Field(Industry, required=False)
    contact = Field(CompanyContact, required=True)

    # lazy
    demands = List(lambda: NonNull(Demand), resolver=demands_by_company)
    supplies = List(lambda: NonNull(Supply), resolver=supplies_by_company)

    # def resolve_contact(root, info):
    #     if root.

    def resolve_industry(root, info):
        if root.industry_id is None:
            return []

        return g.industry_loader.load(root.industry_id)

class Demand(ObjectType):
    id = ID(required=True)
    is_active = Boolean(required=True)
    name = String(required=True)
    description = String(required=False)

    skills = List(NonNull(Skill), required=True)

    quantity = Int(required=True)
    max_hourly_salary = Float(required=False)
    company = Field(lambda: Company, required=True, resolver=company_by_id)

    # we only have this for now
    def resolve_description(root, info):
        if root.description_ext is None:
            return None

        return root.description_ext

    def resolve_skills(root, info):
        if root.skills is None:
            return []

        return g.skill_loader.load_many(root.skills)


class Supply(ObjectType):
    id = ID(required=True)
    is_active = Boolean(required=True)
    name = String(required=True)
    description = String(required=False)

    skills = List(NonNull(Skill), required=True)

    quantity = Int(required=True)
    hourly_salary = Float(required=False)
    company = Field(lambda: Company, required=True, resolver=company_by_id)

    # we only have this for now
    def resolve_description(root, info):
        if root.description_ext is None:
            return None

        return root.description_ext

    def resolve_skills(root, info):
        if root.skills is None:
            return []

        return g.skill_loader.load_many(root.skills)
