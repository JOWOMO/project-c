from graphene import ID, String, ObjectType
from flask import g
from btb.models import db, get_table
from sqlalchemy.sql import select

def company_by_principal(root, info):

    with db.engine.begin() as conn:
        company = get_table("company")
        company_user = get_table("company_user")

        j = company.join(
            company_user, 
            company.c.id == company_user.c.user_id and company_user.c.user_id == g.user.get_id()    
        )

        sel = select([company]).select_from(j)
        result = conn.execute(sel)

        return result.fetchall()
