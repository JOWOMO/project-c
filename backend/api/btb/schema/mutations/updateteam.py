import graphene
from ..types import Team


class TeamInput(graphene.InputObjectType):
    id = graphene.ID(required=False)
    name = graphene.String(required=True)


class UpdateTeam(graphene.Mutation):
    class Arguments:
        team = TeamInput(required=True)

    Output = Team

    @staticmethod
    def mutate(root, info, team):
        return team


class RemoveTeam(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    Output = graphene.String

    @staticmethod
    def mutate(root, info, id):
        return "OK"
