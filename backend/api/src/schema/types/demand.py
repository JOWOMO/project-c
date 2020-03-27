from graphene import ID, Int, String, ObjectType, List, Float, NonNull
from db import db_session, Company as DB_Company

class Demand(ObjectType):
    id = ID(required=True)
    name = String(required=True)
    description = String(required=False)

    tags = List(NonNull(String), required=False)

    amount = Int(required=True)
    max_salary = Float(required=False)
