from graphene import String, ObjectType, ID


class Skill(ObjectType):
    id = ID(required=True)

    group = String(required=True)
    name = String(required=True)
