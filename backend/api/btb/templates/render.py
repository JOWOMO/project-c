from jinja2 import Environment, PackageLoader, select_autoescape

env = Environment(
    loader=PackageLoader("btb", "templates/minified"),
    autoescape=select_autoescape(["html", "xml"]),
)


def render(name, data):
    template = env.get_template(name)
    return template.render(**data)
