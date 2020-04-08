from .template import Template
from os import environ
import pathlib
import posixpath

def load_file(template):
    style_path = posixpath.join(pathlib.Path(__file__).parent.absolute(), 'styles.css')
    path = posixpath.join(pathlib.Path(__file__).parent.absolute(), template)

    css = open(style_path, "r").read()
    match_html = open(path, "r").read()

    match_html.replace(
        '<link rel = "stylesheet" type = "text/css" href="./styles.css" />',
        '<style>{}</style>'.format(css),
    )
    
    # substitute
    match_html = match_html.replace('{#', '[#')
    match_html = match_html.replace('#}', '#]')

    # escape
    match_html = match_html.replace('{', '{{')
    match_html = match_html.replace('}', '}}')

    # result
    match_html = match_html.replace('[#', '{')
    match_html = match_html.replace('#]', '}')

    return match_html
