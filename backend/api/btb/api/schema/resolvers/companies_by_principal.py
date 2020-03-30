from graphene import ID, String, ObjectType
from flask import g, current_app
from btb.api.models import db
from sqlalchemy import text

def companies_by_principal(root, info):
    current_app.logger.debug('companies_by_principal', root)
    sql = text("""
select * 
from 
    btb.company c, btb.company_customer cu
where   
    c.id = cu.company_id 
and cu.customer_id = :id
""")

    # we're coming from me, principal is already resolved
    if root is not None and "id" in root:
        with db.engine.begin() as conn:
            result = conn.execute(sql, id=root["id"])
            return result.fetchall()

    # principal has to be resolved first
    def useMe(me):
        with db.engine.begin() as conn:
            return conn.execute(sql, id=me["id"]).fetchall()

    return g.me_loader.\
        load(g.principal.get_id()).\
        then(lambda me: useMe(me))
