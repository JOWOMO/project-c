from .template import Template
from os import environ
from .load import load_file
from .render import render

def match_template(data):
    frontend = environ["FRONTEND_URL"] if "FRONTEND_URL" in environ else 'http://localhost:5000'

    subject = "{name} {term} {team}".format(**data)
    body = render("match.html", data)
    
    return Template(subject, body)
