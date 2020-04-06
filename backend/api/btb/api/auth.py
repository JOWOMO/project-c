from functools import wraps
from flask import g, request, redirect, url_for, current_app
from werkzeug.wrappers import Request, Response, ResponseStream


class Principal:
    def __init__(self, id, claims):
        self.id = id
        self.claims = claims

    def get_id(self):
        return self.id

    def get_email(self):
        return self.claims["email"]

    def get_first_name(self):
        return self.claims["given_name"]

    def get_last_name(self):
        return self.claims["family_name"]


def load_principal_from_serverless():
    g.principal = None
    environ = request.environ

    current_app.logger.debug("checking serverless.authorizer")
    if "serverless.authorizer" in environ:
        auth = environ["serverless.authorizer"]
        claims = auth["claims"]

        current_app.logger.debug("claims")
        g.principal = Principal(claims["cognito:username"], claims)

    elif current_app.debug:
        current_app.logger.debug(
            "no serverless.authorizer, falling back to debug principal"
        )
        g.principal = Principal("DebugUserId", {"email": "test@example.com"})

    else:
        current_app.logger.error("failed to set auth principal")
        # TODO: Should return an internal server error here


def auth_required(f):
    """
    Ensures, that a valid user is provided
    """

    @wraps(f)
    def decorated_function(*args, **kwargs):
        user: Principal = g.principal

        if user is None:
            return Response(u"Authorization failed", mimetype="text/plain", status=401)

        current_app.logger.debug("user id is {}".format(user.get_id()))

        return f(*args, **kwargs)

    return decorated_function
