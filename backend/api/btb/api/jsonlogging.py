import json
import logging
from flask.logging import default_handler
from flask import request, g

def json_formatter(obj):
    """Formatter for unserialisable values."""
    return str(obj)


class JsonFormatter(logging.Formatter):
    """AWS Lambda Logging formatter.

    Formats the log message as a JSON encoded string.  If the message is a
    dict it will be used directly.  If the message can be parsed as JSON, then
    the parse d value is used in the output record.
    """

    def __init__(self, **kwargs):
        """Return a JsonFormatter instance.

        The `json_default` kwarg is used to specify a formatter for otherwise
        unserialisable values.  It must not throw.  Defaults to a function that
        coerces the value to a string.

        Other kwargs are used to specify log field format strings.
        """
        datefmt = kwargs.pop('datefmt', None)

        super(JsonFormatter, self).__init__(datefmt=datefmt)
        self.format_dict = {
            'timestamp': '%(asctime)s',
            'level': '%(levelname)s',
            'location': '%(name)s.%(funcName)s:%(lineno)d',
        }

        self.format_dict.update(kwargs)
        self.default_json_formatter = kwargs.pop(
            'json_default', json_formatter)

    def format(self, record):
        record_dict = record.__dict__.copy()
        record_dict['asctime'] = self.formatTime(record, self.datefmt)

        log_dict = {
            k: v % record_dict
            for k, v in self.format_dict.items()
            if v
        }

        if isinstance(record_dict['msg'], dict):
            log_dict['message'] = record_dict['msg']
        else:
            log_dict['message'] = record.getMessage()

            # Attempt to decode the message as JSON, if so, merge it with the
            # overall message for clarity.
            try:
                log_dict['message'] = json.loads(log_dict['message'])
            except (TypeError, ValueError):
                pass

        if record.exc_info:
            # Cache the traceback text to avoid converting it multiple times
            # (it's constant anyway)
            # from logging.Formatter:format
            if not record.exc_text:
                record.exc_text = self.formatException(record.exc_info)

        if record.exc_text:
            log_dict['exception'] = record.exc_text

        # check if LocalProxy instances are available
        if g and g.principal:
           log_dict['principal_id'] = g.principal.get_id()

        if g and g.aws_request_id:
           log_dict['aws_request_id'] = g.aws_request_id

        json_record = json.dumps(log_dict, default=self.default_json_formatter)

        if hasattr(json_record, 'decode'):  # pragma: no cover
            json_record = json_record.decode('utf-8')

        return json_record


def load_request_id():
    environ = request.environ

    try:
        context = environ["serverless.context"]
        g.aws_request_id = context.aws_request_id

    except (TypeError, KeyError):
        g.aws_request_id = None


def setup_logger(logger, level='DEBUG', formatter_cls=JsonFormatter, **kwargs):
    try:
        logger.setLevel(level)
    except ValueError:
        logging.root.error('Invalid log level: %s', level)

        level = 'INFO'
        logger.setLevel(level)
    
    if formatter_cls:
        for handler in logger.handlers:
            handler.setFormatter(formatter_cls(
                **kwargs
            ))


def setup_root(**kwargs):
    """Overall Metadata Formatting."""
    setup_logger(logging.root, **kwargs)


def setup_flask(level='DEBUG', formatter_cls=JsonFormatter, **kwargs):
    default_handler.setLevel(level)
    default_handler.setFormatter(formatter_cls(
        **kwargs
    ))


def setup_boto(**kwargs):
    """Overall Metadata Formatting."""

    setup_logger(logging.getLogger('boto'), **kwargs)
    setup_logger(logging.getLogger('boto3'), **kwargs)
    setup_logger(logging.getLogger('botocore'), **kwargs)


