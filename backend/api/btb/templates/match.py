from .template import Template
from os import environ
from .load import load_file
from .render import render

def match_template(data):
    frontend = environ["FRONTEND_URL"] if "FRONTEND_URL" in environ else 'http://localhost:3000'

    subject = "JOWOMO: {name} bittet um Austausch".format(**data)
    body = render("match.html", {
        **data,
        "url": frontend,
    })
    
    return Template(subject, body)
