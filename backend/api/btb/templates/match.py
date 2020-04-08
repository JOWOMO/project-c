from .template import Template
from os import environ
from .load import load_file

def match_template(data):
    frontend = "FRONTEND_URL" if "FRONTEND_URL" in environ else 'http://localhost:5000'

    match_html = load_file('match.html')
    subject = "{name} {term} {team}".format(**data)
    body = match_html.format(**data, url=frontend)
    
    return Template(subject, body)
