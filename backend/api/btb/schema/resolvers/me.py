import graphene
from flask import g


def me(root, info):
    return {
        "id": g.principal.get_id(),
        "email": g.principal.get_email(),
    }
