from .template import Template
from os import environ
from .load import load_file
from .render import render


def reset_template(code):
    frontend = (
        environ["FRONTEND_URL"]
        if "FRONTEND_URL" in environ
        else "http://localhost:5000"
    )

    subject = "JOWOMO: Setze Dein Passwort zurücksetzen"
    body = render("reset.html", {"code": code, "url": frontend})

    return Template(subject, body)
