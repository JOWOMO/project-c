import graphene
from btb.api.schema.types import Company
from btb.api.models import db
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy import text
from flask import g, current_app


class UserInput(graphene.InputObjectType):
    first_name = graphene.String(required=True)
    last_name = graphene.String(required=True)
    email = graphene.String(required=True)

class UpdateUser(graphene.Mutation):
    class Arguments:
        user = UserInput(required=True)

    Output = graphene.String

    @staticmethod
    def mutate(root, info, user):
        current_app.logger.debug("UpdateUser", user)

        with db.engine.begin() as conn:
            sql = text(
                """
update btb.customer
set first_name = :first_name, last_name = :last_name, email = :email
where external_id = :id
            """
            )

            conn.execute(sql, {**user.__dict__, "id": g.principal.get_id()})
