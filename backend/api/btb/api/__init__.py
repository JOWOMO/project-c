from aws_xray_sdk import global_sdk_config
from aws_xray_sdk.core import xray_recorder, patch
from aws_xray_sdk.ext.flask.middleware import XRayMiddleware

from flask import Flask, request, g, current_app, jsonify
from btb.api.auth import load_principal_from_serverless
from btb.api.graphql import graphql_view
from btb.api.models import db
from os import environ
from btb.api.datasources import instanciate_datasources
from flask_cors import CORS
from flask.logging import default_handler

import logging


class CustomLoggingFormatter(logging.Formatter):
    def format(self, record):
        s = record.getMessage()

        if record.exc_text:
            if s[-1:] != "\n":
                s = s + "\n"
            s = s + record.exc_text
            
        if record.stack_info:
            if s[-1:] != "\n":
                s = s + "\n"
            s = s + self.formatStack(record.stack_info)

        record.message = '\r'.join(s.splitlines())

        if self.usesTime():
            record.asctime = self.formatTime(record, self.datefmt)

        s = self.formatMessage(record)

        if record.exc_info:
            # Cache the traceback text to avoid converting it multiple times
            # (it's constant anyway)
            if not record.exc_text:
                record.exc_text = self.formatException(record.exc_info)

        return s


def create_app():
    app = Flask(__name__)

    cors = CORS(
        app,
        resources={r"/*": {"origins": "*"}},
        methods=["GET", "HEAD", "POST", "OPTIONS"],
        supports_credentials=True,
    )

    app.config["SQLALCHEMY_DATABASE_URI"] = environ["SQLALCHEMY_DATABASE_URI"]
    # app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    log = logging.getLogger("sqlalchemy")
    log.setLevel(logging.DEBUG)

    log = logging.getLogger("werkzeug")
    log.setLevel(logging.DEBUG)

    db.init_app(app)

    app.before_request(load_principal_from_serverless)
    app.before_request(instanciate_datasources)

    if app.debug:
        # env var AWS_XRAY_SDK_ENABLED can overwrite this
        global_sdk_config.set_sdk_enabled(False)

        default_handler.setFormatter(
            CustomLoggingFormatter(
                "[%(levelname)s]\t%(asctime)s.%(msecs)dZ\t%(message)s\n",
                "%Y-%m-%d %H:%M:%S",
            )
        )

    else:
        default_handler.setFormatter(
            CustomLoggingFormatter(
                "[%(levelname)s]\t%(asctime)s.%(msecs)dZ\t%(aws_request_id)s\t%(message)s\n",
                "%Y-%m-%d %H:%M:%S",
            )
        )

        # TODO: configure x-ray service
        xray_recorder.configure(service="btbapi")
        # Setup X-Ray Flask Integration
        XRayMiddleware(app, xray_recorder)
        # Setup X-Ray psycopg2, boto3 (aws sdk) Integration
        patch(["psycopg2", "boto3"])

    @app.route("/")
    def index():
        return "Server is running<br><a href='/graphql'>Server</a>"

    app.add_url_rule("/graphql", view_func=graphql_view(app.debug))

    return app
