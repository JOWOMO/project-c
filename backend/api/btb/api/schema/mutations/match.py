import graphene
from btb.api.schema.types import Company, JSONScalar
from btb.api.models import db
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy import text
from flask import g, current_app
import boto3
import json
from os import environ
from btb.templates import match_template, send_email
from graphene import Field, ID, String, ObjectType
from btb.api.schema.types import CompanyContact


class MatchDetails(ObjectType):
    """This needs refactoring for all resource types: Address"""

    id = ID(required=True)

    name = String(required=True)
    first_name = String(required=True)
    last_name = String(required=True)
    picture_url = String(required=False)
    email = String(required=True)

    address_line1 = String(required=True)
    postal_code = String(required=True)
    city = String(required=True)


class MatchAnswer(graphene.Enum):
    Opened = 1
    Accept = 2
    Reject = 3


DISABLE_CHECK = (
    True
    if "DISABLE_MATCH_OWNER_CHECK" in environ and environ["DISABLE_MATCH_OWNER_CHECK"] == "true"
    else False
)

class SetMatchState(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        answer = graphene.Argument(MatchAnswer, required=True)

    Output = MatchDetails

    @staticmethod
    def mutate(root, info, id, answer):
        current_app.logger.debug("AcceptMatch %s %s", id, answer)

        with db.engine.begin() as conn:
            match = conn.execute(
                text(
                    """
select c.*
from
    btb_data.contact_request r

    left join btb.match_team_demand d
      on
            match_type = 'demand'
        and d.record_id = r.request_id
        -- response must be from calling user
        {escape} and d.external_id = :user

    left join btb.match_team_supply s
      on
            match_type = 'supply'
        and s.record_id = r.request_id
        -- response must be from calling user
        {escape} and s.external_id = :user

    join btb.company_with_contact c on
      -- there will only be one
      c.id = COALESCE(d.company_id, s.company_id)

where
    r.id = :id
            """.format(
                        escape="---" if DISABLE_CHECK else ""
                    )
                ),
                id=id,
                user=g.principal.get_id(),
            ).fetchone()

            if match is None:
                raise ValueError("NOT_FOUND")

            if answer == MatchAnswer.Accept:
                column = "date_accepted"
            elif answer == MatchAnswer.Opened:
                column = "date_opened"
            else:
                column = "date_rejected"

            # store timestamp
            conn.execute(
                text(
                    """
update
    btb_data.contact_request
set
    {column} = now()
where
    id = :id
and {column} is null
            """.format(column=column)
                ),
                id=id,
            )

            return {
                "id": id,
                **match["contact"],
                **match,
            }
