
from graphene import ObjectType
from .mutations import UpdateCompany

class Mutation(ObjectType):    
    update_company = UpdateCompany.Field()
