from graphene import String, ObjectType, ID

class Skill(ObjectType):
    id = ID(required=True)
    text = String(required=True)
    