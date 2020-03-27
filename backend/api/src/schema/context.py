from auth import Principal
from flask import Request
from db import db_session
from sqlalchemy.orm import (scoped_session)

class Context():
    '''Context available to all functions'''
    
    def __init__(self, principal, request):
        self.principal = principal
        self.request = request

    def get_principal(self) -> Principal:
        return self.principal

    def get_request(self) -> Request:
        return self.request

    def db(self) -> scoped_session:
        return db_session
