from werkzeug.wrappers import Request, Response, ResponseStream
from flask import g
from .constants import USER_KEY, IS_OFFLINE
from .principal import Principal

class AuthMiddleware():
    '''
    Lambda Authentication Middleware
    Extracts authentication information from Lambda environment
    '''

    def __init__(self, app):
        self.app = app

    def __call__(self, environ, start_response):
        # print('environ', environ)

        if "serverless.authorizer" in environ:
            auth = environ['serverless.authorizer']
            claims = auth['claims']

            environ[USER_KEY] = Principal(
                claims['cognito:username'],
                claims['email'],
            )

        elif IS_OFFLINE:
            environ[USER_KEY] = Principal('offline', 'test@nowhere.de')

        return self.app(environ, start_response)
