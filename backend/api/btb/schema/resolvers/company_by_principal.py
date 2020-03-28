from graphene import ID, String, ObjectType


def company_by_principal(root, info):
    return {}


#    context: Context = info.context
#    principal = context.get_principal()

#    result = context.db().query(DB_Company).filter(DB_Company.ownerid.is_(principal.get_id()))
#    print (result)

#    return result
