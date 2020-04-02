from graphene import ID, String, ObjectType, List
from .company import Company
from btb.api.schema.resolvers import companies_by_principal


class User(ObjectType):
    id = ID(required=True)
    external_id = ID(required=True)
    email = String(required=True)

    """Deprecated"""
    name = String(required=False)
    
    first_name = String(required=False)
    last_name = String(required=False)

    companies = List(Company, resolver=companies_by_principal)

    def resolve_name(root, info): 
        return "{} {}".format(root["first_name"], root["last_name"])
