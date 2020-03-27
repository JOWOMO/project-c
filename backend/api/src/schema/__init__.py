from graphene import Schema

from .query import Query
from .context import Context
from .mutation import Mutation

executableSchema = Schema(query=Query, mutation=Mutation)
