from graphene import ID, String, ObjectType

def demands_by_company(root, info):
    context: Context = info.context
    principal = context.get_principal()

    return []


#
