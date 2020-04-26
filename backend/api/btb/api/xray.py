from aws_xray_sdk import global_sdk_config
from aws_xray_sdk.core import xray_recorder, patch
from aws_xray_sdk.ext.flask.middleware import XRayMiddleware
import logging

def init_xray(app):
    logging.getLogger("aws_xray_sdk").setLevel('ERROR')

    if app.debug:
        # env var AWS_XRAY_SDK_ENABLED can overwrite this
        global_sdk_config.set_sdk_enabled(False)

    else:
        # TODO: configure x-ray service
        xray_recorder.configure(service="btbapi")
        # Setup X-Ray Flask Integration
        XRayMiddleware(app, xray_recorder)
        # Setup X-Ray psycopg2, boto3 (aws sdk) Integration
        patch(["psycopg2", "boto3"])


