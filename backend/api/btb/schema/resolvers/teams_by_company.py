from graphene import ID, String, ObjectType

def teams_by_company(root, info):
    context: Context = info.context
    principal = context.get_principal()

    return []


#
