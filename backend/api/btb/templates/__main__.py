from os import environ
import pathlib
import posixpath
from premailer import transform
import re

files = [
    'code.html',
    'match.html',
    'reset.html',
]

def handler():
    in_path = posixpath.join(
        pathlib.Path(__file__).parent.absolute(),
        './raw/'
    )

    out_path = posixpath.join(
        pathlib.Path(__file__).parent.absolute(),
        './minified/'
    )

    for file_name in files:
        print ('processing %s', file_name)

        template = open(
            posixpath.join(in_path, file_name), 
            encoding='utf-8', mode="r"
        ).read()

        replaced = transform(
            template, 
            base_path=in_path, 
            disable_validation=True,
            cache_css_parsing=False,
            disable_link_rewrites=True,
            exclude_pseudoclasses=True,
        )

        replaced = re.sub(r"#([a-z_]+)#", r"{{\1}}", replaced)
        replaced = re.sub(r"\u00A0", "", replaced)

        f = open(
            posixpath.join(out_path, file_name), 
            encoding='utf-8',
            mode="w",
        )
        f.write(replaced)
        f.close()


if __name__ == "__main__":
    handler()
