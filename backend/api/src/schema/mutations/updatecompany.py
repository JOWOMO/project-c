import graphene
from ..types import Company

class CompanyInput(graphene.InputObjectType):
    id = graphene.ID(required=False) 
    name = graphene.String(required=True)

class UpdateCompany(graphene.Mutation):
    class Arguments:
        company = CompanyInput(required=True)

    Output = Company
    
    @staticmethod
    def mutate(root, info, company):
        return company
