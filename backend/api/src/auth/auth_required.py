from functools import wraps
from flask import  g, request, redirect, url_for
from werkzeug.wrappers import Request, Response, ResponseStream
from .constants import USER_KEY
from .principal import Principal

def auth_required(f):
    '''
    Ensures, that a valid user is provided
    '''

    @wraps(f)
    def decorated_function(*args, **kwargs):
        user: Principal = request.environ[USER_KEY]

        if user is None:
            return Response(u'Authorization failed', mimetype= 'text/plain', status=401)

        print ('[AUTH] user is', user.get_id())

        return f(*args, **kwargs)
    return decorated_function
