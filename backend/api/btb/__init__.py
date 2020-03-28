from flask import Flask, request, g, current_app, jsonify
from flask_sqlalchemy import SQLAlchemy
from btb.auth import load_principal_from_serverless
from btb.graphql import graphql_view
from btb.models import db, setup_dev_data, get_table


def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///memory"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)

    app.before_request(load_principal_from_serverless)

    @app.route("/")
    def index():
        return "Server is running<br><a href='/graphql'>Server</a>"

    app.add_url_rule("/graphql", view_func=graphql_view(app.debug))

    return app
