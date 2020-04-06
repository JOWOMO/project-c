from graphene import String, ObjectType, ID


class Industry(ObjectType):
    id = ID(required=True)
    name = String(required=True)
