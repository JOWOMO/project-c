from graphene import InputObjectType, Float, Boolean, String, ObjectType, ID, Field, List, NonNull, Int
from .company import Company, Supply

class CursorInput(InputObjectType):
    offset = Int()

class MatchQueryInput(InputObjectType):
    postal_code = String()
    radius = Int()

    skills = List(Int)
    max_salary = Float()

class Match(ObjectType):
    company = Field(Company, required=True)
    supplies = List(NonNull(Supply), required=True)

class PageInfo(ObjectType):
    has_next_page = Boolean()
    offset = Int()
    page_size = Int(required=True)

class MatchResult(ObjectType):
    matches = List(Match, required=True)
    page_info = Field(PageInfo, required=True)
