from .types import User, Company
from .resolvers import me
from graphene import ObjectType, Field, List
from .resolvers import company_by_principal

class Query(ObjectType):    
    Me = Field(User, resolver=me)
    Companies = List(Company, resolver=company_by_principal)
