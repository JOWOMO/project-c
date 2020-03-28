from flask import Flask, request, g, current_app
from flask_sqlalchemy import SQLAlchemy
from btb.auth import load_principal_from_serverless
from btb.graphql import graphql_view

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    # app.wsgi_app = AuthMiddleware(app.wsgi_app)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///memory"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    # app.wsgi_app = AuthMiddleware(app.wsgi_app)
    # app.debug = IS_OFFLINE

    db.init_app(app)

    app.before_request(load_principal_from_serverless)

    @app.route("/")
    def index():
        return "Server is running<br><a href='/graphql'>Server</a>"

    app.add_url_rule("/graphql", view_func=graphql_view(app.debug))

    return app
