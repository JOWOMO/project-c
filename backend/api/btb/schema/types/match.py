from graphene import InputObjectType, String, ObjectType, ID, Field, List, NonNull, Int
from .company import Company, Supply

class MatchQueryInput(InputObjectType):
    skills = List(Int)
    # location
    # radius

class Match(ObjectType):
    company = Field(Company, required=True)
    supplies = List(NonNull(Supply), required=True)

