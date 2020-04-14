from graphene import ObjectType, Field, Schema, ID, Int, List, String, NonNull, Argument
from btb.api.schema.types import (
    User,
    Demand,
    Supply,
    Company,
    Skill,
    MatchDemandResult,
    MatchSupplyResult,
    MatchQueryInput,
    CursorInput,
    Industry,
)
from btb.api.schema.resolvers import (
    me as resolveme,
    demand_by_id,
    supply_by_id,
    company_by_id,
    skills as skills_resolver,
    companies_by_principal,
    match_supplies_by_query,
    match_demands_by_query,
    match_demand_by_id,
    match_supply_by_id,
    industries as industies_resolver,
    active_demands_by_principal,
    active_supplies_by_principal,
    team_names
)
from btb.api.schema.mutations import (
    UpdateCompany,
    UpdateDemand,
    RemoveDemand,
    UpdateSupply,
    RemoveSupply,
    UpdateUser,
    StartUploadPicture,
    ContactMatch,
)


class Query(ObjectType):
    me = Field(NonNull(User), resolver=resolveme)

    companies = List(NonNull(Company), resolver=companies_by_principal)

    active_demands = List(Demand, resolver=active_demands_by_principal)
    active_supplies = List(Supply, resolver=active_supplies_by_principal)

    demand = Field(Demand, id=ID(required=True), resolver=demand_by_id)
    supply = Field(Supply, id=ID(required=True), resolver=supply_by_id)
    company = Field(Company, id=ID(required=True), resolver=company_by_id)

    skills = List(NonNull(Skill), required=True, resolver=skills_resolver)
    industries = List(NonNull(Industry), required=True, resolver=industies_resolver)
    team_names = List(NonNull(String), required=True, resolver=team_names)
    
    match_demand = Field(
        MatchSupplyResult,
        cursor=Argument(CursorInput),
        id=Argument(ID, required=True),
        radius = Argument(Int),
        required=True,
        resolver=match_demand_by_id,
    )

    match_supply = Field(
        MatchDemandResult,
        cursor=Argument(CursorInput),
        id=Argument(ID, required=True),
        radius = Argument(Int),
        required=True,
        resolver=match_supply_by_id,
    )

    match_supplies = Field(
        MatchSupplyResult,
        cursor=Argument(CursorInput),
        query=Argument(MatchQueryInput, required=True),
        required=True,
        resolver=match_supplies_by_query,
    )

    match_demands = Field(
        MatchDemandResult,
        cursor=Argument(CursorInput),
        query=Argument(MatchQueryInput, required=True),
        required=True,
        resolver=match_demands_by_query,
    )


class Mutation(ObjectType):
    update_user = UpdateUser.Field()
    update_company = UpdateCompany.Field()

    update_demand = UpdateDemand.Field()
    remove_demand = RemoveDemand.Field()

    update_supply = UpdateSupply.Field()
    remove_supply = RemoveSupply.Field()

    start_upload_picture = StartUploadPicture.Field()
    contact_match = ContactMatch.Field()


executableSchema = Schema(query=Query, mutation=Mutation)
