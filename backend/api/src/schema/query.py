from .types import User
from .resolvers import me
from graphene import ObjectType, Field

class Query(ObjectType):    
    Me = Field(User, resolver=me)

