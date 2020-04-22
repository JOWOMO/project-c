import json
import os

import graphene
from flask import current_app, g
from btb.jsd import JSDClient


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
        summary = graphene.String(required=True)
        description = graphene.String(required=True)

    Output = graphene.String

    @staticmethod
    def mutate(root, info, summary, description):
        current_app.logger.debug("CreateSupportRequest")

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
            current_app.logger.error("Failed to initialize JSD Client", e)
            raise Exception("SupportDesk not avalaible")

        user = jsd.create_or_find_user(
            "{} {}".format(g.principal.get_first_name(), g.principal.get_last_name()),
            g.principal.get_email(),
        )

        result = jsd.create_request(
            user["accountId"], jsd_request_type, summary, description
        )

        return result["_links"]["web"]
