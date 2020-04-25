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


class MatchType(graphene.Enum):
    Supply = 1
    Demand = 2


class ContactMatch(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        origin_id = graphene.ID(required=True)
        match_type = graphene.Argument(MatchType, required=True)

    Output = graphene.Boolean

    @staticmethod
    def filter_record(record_to_filter):
        record = {**record_to_filter}

        record.pop('id', None)
        record.pop('description_int', None)
        record.pop('is_active', None)

        if "max_hourly_salary" in record or "hourly_salary" in record:
            record["salary"] = record["max_hourly_salary"] if "max_hourly_salary" in record else record["hourly_salary"]

        if "description_ext" in record:
            record["description"] = record["description_ext"]

        record.pop('description_ext', None)
        record.pop('description_int', None)

        record.pop('max_hourly_salary', None)
        record.pop('hourly_salary', None)

        return record


    @staticmethod
    def check_recipient(match, origin):
        """
        Prevent that the same person has already been contacted for the position
        within x-days
        """
        with db.engine.begin() as conn:
            sql = text(
                """
select external_id
from btb.contact_requests_week
where 
    external_id = :id
and response_id = :response_id
limit 1
            """
            )

            match = [
                m for m in conn.execute(
                    sql,
                    id=g.principal.get_id(),
                    response_id=match["id"],
                )
            ]

            # len 0 means 0 today
            if len(match) == 1:
                raise ValueError("TOO_MANY_RECIPIENT")


    @staticmethod
    def check_throttle():
        """
        Ensures that only XX requests per day are executed
        """

        with db.engine.begin() as conn:
            sql = text(
                """
select count(*) as count
from btb.contact_requests_today
where external_id = :id
            """
            )

            match = [m for m in conn.execute(sql, id=g.principal.get_id())]

            # len 0 means 0 today
            if len(match) == 1:
                max_requests = int(
                    environ["MAX_CONTACT_REQUESTS"]) if "MAX_CONTACT_REQUESTS" in environ else 10

                if (match[0]["count"] >= max_requests) and not(current_app.debug):
                    raise ValueError("TOO_MANY_REQUESTS")


    @staticmethod
    def archive_match(conn, match_type, origin, match):
        # calculate distance between companies
        distance_sql = text(
            """
select st_distance(btb.get_postalcode_position(:fr), btb.get_postalcode_position(:t)) as distance
        """
        )

        distance = [
            m for m in conn.execute(
                distance_sql,
                fr=origin["postal_code"],
                t=match["postal_code"]
            )
        ][0]["distance"]

        insert_sql = text(
            """
insert into btb_data.contact_request (
    external_id, 
    request_id, 
    response_id, 
    match_type, 
    request, 
    response, 
    distance
)
values (
    :external_id, 
    :request_id, 
    :response_id, 
    :match_type, 
    :request, 
    :response, 
    :distance
)
returning id
        """
        )

        insert = conn.execute(
            insert_sql,
            external_id=g.principal.get_id(),

            distance=distance,
            match_type='demand' if match_type == 2 else 'supply',

            request_id=origin["id"],
            request=json.dumps(
                ContactMatch.filter_record(origin["record"])),

            response_id=match["id"],
            response=json.dumps(
                ContactMatch.filter_record(match["record"])),
        )

        return list(insert)[0]["id"]


    @staticmethod
    def find_match(conn, match_type, id):
        table_name = 'team_supply' if match_type == 2 else 'team_demand'

        # match must not be us
        match_sql = text(
            """
select r.id as id, r.name as name, c.owner_external_id as external_id, c.contact as contact, c.postal_code as postal_code, r.name, row_to_json(r) as record
from
    btb_data.{} r, 
    btb.company_with_contact c
where
    r.company_id = c.id
and r.id = cast(:id as uuid)
and c.owner_external_id <> :external_id
        """.format(table_name)
        )

        match = [m for m in conn.execute(
            match_sql, id=id, external_id=g.principal.get_id())]
        if len(match) != 1:
            raise ValueError("NOT_FOUND")

        return match[0]

    @staticmethod
    def find_origin(conn, match_type, origin_id):
        inverted_table_name = 'team_demand' if match_type == 2 else 'team_supply'

        # request must be from us
        origin_sql = text(
            """
select r.id as id, r.name as name, c.owner_external_id as external_id, c.contact as contact, c.postal_code as postal_code, r.name, row_to_json(r) as record
from
    btb_data.{} r, 
    btb.company_with_contact c
where
    r.company_id = c.id
and r.id = cast(:id as uuid)
and c.owner_external_id = :external_id
            """.format(inverted_table_name)
        )

        origin = [m for m in conn.execute(
            origin_sql, id=origin_id, external_id=g.principal.get_id())]

        if len(origin) != 1:
            raise ValueError("NOT_FOUND")

        return origin[0]


    @staticmethod
    def contact(id, origin, match_type, match):

        from_email = environ["EMAIL_SENDER"] if "EMAIL_SENDER" in environ else 'debug'
        to_email = match["contact"]['email']

        team_type = 'supply' if match_type == 1 else 'demand'
        your_team_type = 'supply' if match_type != 1 else 'demand'

        data = {
            "match_id": id,
            "name": origin["contact"]["first_name"] + " " + origin["contact"]["last_name"],

            "team": origin["name"],
            "team_type": team_type,
            "team_id": origin["id"],

            "term": 'bietet' if match_type == 1 else 'sucht',
            "subject": 'Gesuch' if match_type == 1 else 'Angebot',

            "external_id": match["external_id"],
            "your_team": match["name"],
            "your_team_type": your_team_type,
            "your_team_id": match["id"],
        }

        template = match_template(data)
        send_email(to_email, template)


    @staticmethod
    def mutate(root, info, id, origin_id, match_type):
        current_app.logger.debug(
            "ContactMatch %s %s %s", id, origin_id, match_type)

        # check throtteling
        ContactMatch.check_throttle()

        match = None
        origin = None

        with db.engine.begin() as conn:
            match = ContactMatch.find_match(conn, match_type, id)
            origin = ContactMatch.find_origin(conn, match_type, origin_id)

            ContactMatch.check_recipient(match, origin)

            current_app.logger.debug(
                'match {} origin {}'.format(match, origin))

            id = ContactMatch.archive_match(
                conn,
                match_type,
                origin,
                match,
            )

            ContactMatch.contact(id, origin, match_type, match)
