from graphene import ID, String, ObjectType
from flask import g
from btb.api.models import db
from sqlalchemy import text


def validate_postal_code(root, info, code):
    with db.engine.begin() as conn:
        result = conn.execute(
            text(
                """
select postalcode::text  <-> :code as distance, postalcode, placename
from btb_data.postalcodes
where postalcode % :code
order by 1
limit 10
"""
            ),
            code=code,
        )

        data = list(result.fetchall())

        if len(data) == 0:
            return []

        if data[0]["distance"] == 0:
            data = [data[0]]

        return map(lambda r: {
            "postal_code": r["postalcode"], 
            "name": r["placename"]
        }, data)
