from graphene import ID, String, ObjectType, List, NonNull
from .company import Company
from btb.api.schema.resolvers import companies_by_principal


class PostalCodeMatch(ObjectType):
    postal_code = String(required=True)
    name = String(required=True)

