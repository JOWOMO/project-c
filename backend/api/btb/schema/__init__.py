from graphene import ObjectType, Field, Schema
from btb.schema.types import User
from btb.schema.resolvers import me
from btb.schema.mutations import UpdateCompany


class Query(ObjectType):
    Me = Field(User, resolver=me)


class Mutation(ObjectType):
    update_company = UpdateCompany.Field()


executableSchema = Schema(query=Query, mutation=Mutation)
