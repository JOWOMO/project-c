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
from btb.api.error import ApiError

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
select 
    c.*
from
    btb_data.contact_request r

    -- response
    left join btb.match_team_demand d
        on
            r.match_type = 'demand'
        and d.record_id = r.request_id

    left join btb.match_team_supply s
        on
            r.match_type = 'supply'
        and s.record_id = r.request_id

    -- request
    left join btb.match_team_demand rd
        on
            r.match_type = 'supply'
        and rd.record_id = r.response_id
        -- must be owned by calling user
        {escape} and rd.external_id = :user

    left join btb.match_team_supply rs
        on
            r.match_type = 'demand'
        and rs.record_id = r.response_id
        -- must be owned by calling user
        {escape} and rs.external_id = :user

    join btb.company_with_contact c on
        -- there will only be one
        c.id = COALESCE(d.company_id, s.company_id)

where
        r.id = :id
        -- must be owned by the user
    and COALESCE(rd.record_id, rs.record_id) is not null
;
            """.format(
                        escape="---" if DISABLE_CHECK else ""
                    )
                ),
                id=id,
                user=g.principal.get_id(),
            ).fetchone()

            if match is None:
                raise ApiError("Record not found", code="NOT_FOUND")

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
