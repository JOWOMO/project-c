from graphene import ID, String, ObjectType
from flask import g, current_app
from btb.api.models import db
from sqlalchemy import text


def companies_by_principal(root, info):
    current_app.logger.debug("companies_by_principal %s", root)
    sql = text(
        """
select * 
from 
    btb.company_with_contact
where   
    owner_id = :id 
"""
    )

    # already populated
    if root is not None and "companies" in root:
        return root["companies"]

    # we're coming from me, principal is already resolved
    if root is not None and "id" in root:
        with db.engine.begin() as conn:
            result = conn.execute(sql, id=root["id"])
            return result.fetchall()

    # principal has to be resolved first
    def useMe(me):
        with db.engine.begin() as conn:
            return conn.execute(sql, id=me["id"]).fetchall()

    return g.me_loader.load(g.principal.get_id()).then(lambda me: useMe(me))
