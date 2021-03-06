import json
import os

import graphene
from flask import current_app, g
from btb.jsd import JSDClient
from btb.api.error import ApiError
from btb.api.constants import InputLengths
from btb.api.schema.types.util import LimitedString
def setup_jsd_from_env():
    try:
        jsdconfig = json.loads(os.environ["JOWOMO_JSD_CONFIG"])
        jsd = JSDClient(
            jsdconfig["instance_name"],
            jsdconfig["project_id"],
            jsdconfig["user"],
            jsdconfig["api_key"],
        )
    except Exception as e:
        current_app.logger.error("Failed to initialize JSD Client", e)


class CreateSupportRequest(graphene.Mutation):
    class Arguments:
        summary = LimitedString(required=True, maxLength=InputLengths.LONG_STRING)
        description = LimitedString(required=True, maxLength=InputLengths.LONG_STRING)
        page = LimitedString(required=True, maxLength=InputLengths.LONG_STRING)

    Output = graphene.String

    @staticmethod
    def mutate(root, info, summary, description, page):
        current_app.logger.debug("CreateSupportRequest {} {} {}".format(summary, description, page))

        try:
            jsdconfig = json.loads(os.environ["JOWOMO_JSD_CONFIG"])
            # fixme: maybe move JSDClient intialization to somewhere, so this mutation can run faster?
            jsd = JSDClient(
                jsdconfig["instance_name"],
                jsdconfig["project_id"],
                jsdconfig["user"],
                jsdconfig["api_key"],
            )
            jsd_request_type = jsdconfig["request_type"]

        except Exception as e:
            current_app.logger.error("Failed to initialize JSD Client {}".format(e))
            raise ApiError("Support Desk not available")

        user = jsd.create_or_find_user(
            "{} {}".format(g.principal.get_first_name(), g.principal.get_last_name()),
            g.principal.get_email(),
        )

        result = jsd.create_request(
            user["accountId"], 
            jsd_request_type, 
            { 
                "summary": summary, 
                "description": description,
                "customfield_10054": os.environ["STAGE"],
                "customfield_10053": page[:254] if len(page) > 254 else page
            },
        )

        return result["_links"]["web"]
