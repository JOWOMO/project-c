from graphene import ID, String, ObjectType
from db import db_session, Company as DB_Company

class Company(ObjectType):
    id = ID(required=True)
    name = String(required=True)
    
    street1 = String(required=False)
    street2 = String(required=False)
    street3 = String(required=False)

    postal_code = String(required=True)
    city = String(required=True)
    #country = String(required=True)
