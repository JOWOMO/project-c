from flask import Flask, request, g, current_app, jsonify
from btb.api.auth import load_principal_from_serverless
from btb.api.graphql import graphql_view
from btb.api.models import db
from os import environ
from btb.api.datasources import instanciate_datasources
from flask_cors import CORS
import logging
import json
from werkzeug.exceptions import InternalServerError
import uuid

from .jsonlogging import (
    setup_root,
    JsonFormatter,
    setup_logger,
    setup_flask,
    load_request_id,
)
from .xray import init_xray


def init_logging(app):
    if app.debug:
        return

    logging.basicConfig(level=logging.DEBUG)

    setup_root()
    setup_flask()

    # SQLAlchemy
    logger = logging.getLogger("sqlalchemy.engine.base.Engine")
    setup_logger(logger)
    logger.propagate = False

    logging.getLogger("werkzeug").setLevel("ERROR")

    # configuration done by root module
    # setup_logger(
    #     logging.getLogger('graphql.errors')
    # )

    # setup_logger(
    #     logging.getLogger('graphql.execution.utils')
    # )

    # setup_logger(
    #     logging.getLogger('graphql.execution.executor')
    # )

    # XRAY
    init_xray(app)


def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = environ["SQLALCHEMY_DATABASE_URI"]
    # app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)
    init_logging(app)

    # Request processing
    app.before_request(load_request_id)
    app.before_request(load_principal_from_serverless)
    app.before_request(instanciate_datasources)

    CORS(
        app,
        resources={r"/*": {"origins": "*"}},
        methods=["GET", "HEAD", "POST", "OPTIONS"],
    )

    # Routes
    @app.route("/")
    def index():
        return "Server is running<br><a href='/graphql'>Server</a>"

    @app.errorhandler(Exception)
    def handle_500(e):
        request_id = g.aws_request_id if g.aws_request_id else str(uuid.uuid4())

        return json.dumps(
            {
                "message": str(e) if current_app.debug else "INTERNAL_SERVER_ERROR",
                "code": 500,
                "requestid": request_id,
            }
        )

    app.add_url_rule("/graphql", view_func=graphql_view(app.debug))

    return app
