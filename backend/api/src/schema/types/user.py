from graphene import ID, String, ObjectType, List
from .company import Company
from ..resolvers import company_by_principal

class User(ObjectType):
    id = ID(required=True)
    email = String(required=True)

    name = String(required=False)
    companies = List(Company, resolver=company_by_principal)
