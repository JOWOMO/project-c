from werkzeug.wrappers import Request, Response, ResponseStream
from flask import g
from .constants import USER_KEY, IS_OFFLINE

class Principal():
    def __init__(self, id, email):
        self.id = id
        self.email = email
    
    def get_id(self):
        return self.id

    def get_email(self):
        return self.email
