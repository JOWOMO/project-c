from graphene import ID, String, ObjectType
from db import Company as DB_Company

def company_by_principal(root, info):
    context: Context = info.context
    principal = context.get_principal()

    result = context.db().query(DB_Company).filter(DB_Company.ownerid.is_(principal.get_id()))
    print (result)

    return result
#