
from graphene import ObjectType
from .mutations import UpdateCompany, UpdateTeam, RemoveTeam

class Mutation(ObjectType):    
    update_company = UpdateCompany.Field()
    update_team = UpdateTeam.Field()
    remove_team = RemoveTeam.Field()    
