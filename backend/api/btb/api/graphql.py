from flask_graphql import GraphQLView
from btb.api.schema import executableSchema
from btb.api.auth import auth_required
from graphql.error import GraphQLLocatedError
from graphql import GraphQLError
from graphql.error import format_error
from flask import g, current_app
from sqlalchemy.exc import SQLAlchemyError
from .error import ApiError
import uuid
import sys
from werkzeug.wrappers import Response
from functools import wraps
from json import dumps


class ErrorHandlingView(GraphQLView):
    @staticmethod
    def strip_debug(dict):
        if not current_app.debug:
            dict.pop("message", None)

        return dict

    @staticmethod
    def format_error(error):
        formatted = None

        # graphene likes to wrap all of the exceptions, unwrap
        if isinstance(error, GraphQLLocatedError):
            error = error.original_error

        # Is this an error we want to pass through?
        if isinstance(error, GraphQLError):
            formatted = format_error(error)
            formatted["extensions"] = {"code": "GRAPHQL"}

        elif isinstance(error, SQLAlchemyError):
            formatted = ErrorHandlingView.strip_debug(
                {
                    "message": str(error),
                    "extensions": {"code": "SQL_ERROR", "cause": error.code,},
                }
            )

        # this one does not provide critial data
        elif isinstance(error, ApiError):
            formatted = {"message": str(error), "extensions": {"code": error.code,}}

        else:
            formatted = ErrorHandlingView.strip_debug(
                {
                    "extensions": {"code": "INTERNAL_SERVER_ERROR",},
                    "message": str(error),
                }
            )

        # if it is not set and there are multiple errors we will get multiple ids, which doesn't matter here
        request_id = g.aws_request_id if g.aws_request_id else str(uuid.uuid4())

        # we force the id in the logs
        current_app.logger.error("request_id %s", request_id)

        # add aws request id
        formatted["extensions"]["requestid"] = request_id
        return formatted


def graphql_view(debug=False):
    view = ErrorHandlingView.as_view(
        "graphql",
        schema=executableSchema,
        graphiql=debug,
        pretty=debug,
        graphiql_version="0.17.5",
    )

    # everything is authenticated (for now)
    return auth_required(view)
