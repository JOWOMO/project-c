from graphene import ObjectType, Field, Schema, ID, List, NonNull
from btb.schema.types import User, Demand, Supply, Company, Skill
from btb.schema.resolvers import me as resolveme, demand_by_id, supply_by_id, company_by_id, skills as skills_resolver, companies_by_principal
from btb.schema.mutations import UpdateCompany, UpdateDemand, RemoveDemand, UpdateSupply, RemoveSupply

class Query(ObjectType):
    me = Field(NonNull(User), resolver=resolveme)
    
    companies = List(NonNull(Company), resolver=companies_by_principal)

    demand = Field(Demand, id=ID(required=True), resolver=demand_by_id)
    supply = Field(Supply, id=ID(required=True), resolver=supply_by_id)
    company = Field(Company, id=ID(required=True), resolver=company_by_id)

    skills = List(NonNull(Skill), required=True, resolver=skills_resolver)

class Mutation(ObjectType):
    update_company = UpdateCompany.Field()

    update_demand = UpdateDemand.Field()
    remove_demand = RemoveDemand.Field()

    update_supply = UpdateSupply.Field()
    remove_supply = RemoveSupply.Field()


executableSchema = Schema(query=Query, mutation=Mutation)
