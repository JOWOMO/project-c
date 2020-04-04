from graphene import (
    InputObjectType,
    Float,
    Boolean,
    String,
    ObjectType,
    ID,
    Field,
    List,
    NonNull,
    Int,
)
from .company import Company, Supply, Demand


class CursorInput(InputObjectType):
    offset = Int()


class MatchQueryInput(InputObjectType):
    radius = Int()

    # must give skillset
    skills = List(NonNull(Int), required=True)
    postal_code = String(required=True)

    max_salary = Float()
    min_quantity = Int()


class PageInfo(ObjectType):
    has_next_page = Boolean()
    offset = Int()
    page_size = Int(required=True)


class SupplyMatch(ObjectType):
    distance = Int()
    percentage = Int()
    supply = Field(Supply, required=True)


class MatchSupplyResult(ObjectType):
    matches = List(NonNull(SupplyMatch), required=True)
    page_info = Field(PageInfo, required=True)


class DemandMatch(ObjectType):
    distance = Int()
    percentage = Int()
    demand = Field(Demand, required=True)


class MatchDemandResult(ObjectType):
    matches = List(NonNull(DemandMatch), required=True)
    page_info = Field(PageInfo, required=True)
