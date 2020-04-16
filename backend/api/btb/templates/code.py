from .template import Template
from os import environ
from .load import load_file
from .render import render

def code_template(code):
    frontend = environ["FRONTEND_URL"] if "FRONTEND_URL" in environ else 'http://localhost:5000'

    match_html = load_file('code.html')
    subject = "Bestätige Deine E-Mail Adresse"
    body = render("code.html", {"url": frontend, "code": code})
    
    return Template(subject, body)
