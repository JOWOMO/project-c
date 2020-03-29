import graphene
from flask import g
from btb.models import db, get_table
from sqlalchemy.sql import select

def me(root, info):

    with db.engine.begin() as conn:
        user = get_table("customer")
        sel = select(
            [user.c.id, user.c.name, user.c.email],
            user.c.external_id == g.principal.get_id(),
        )
        result = conn.execute(sel)
        data = result.fetchone()

        return {
            **data,
            "external_id": g.principal.get_id(),
            "email": g.principal.get_email(),
        }
