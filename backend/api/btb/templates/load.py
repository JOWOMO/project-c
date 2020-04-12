from os import environ
import pathlib
import posixpath

def load_file(template):
    this_path = pathlib.Path(__file__).parent.absolute()
    # style_path = posixpath.join(this_path, 'styles.css')
    path = posixpath.join(this_path, 'minified/{}'.format(template))

    # css = open(style_path, encoding='utf-8', mode="r").read()
    match_html = open(path, encoding='utf-8', mode="r").read()

    # inlines the styles
    return match_html
