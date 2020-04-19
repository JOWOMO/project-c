from graphene import ID, String, ObjectType
from flask import g
from btb.api.models import db
from sqlalchemy import text


def active_supplies_by_principal(root, info):
    with db.engine.begin() as conn:
        result = conn.execute(
            text("""
select d.* 
from
  btb_data.team_supply d,
  btb_data.company c,
  btb_data.company_customer cc,
  btb_data.customer u
where 
    d.company_id = c.id
and c.id = cc.company_id
and cc.customer_id = u.id
and u.external_id = :id
and d.is_active = True
"""), id=g.principal.get_id()
        )

        return result.fetchall()
