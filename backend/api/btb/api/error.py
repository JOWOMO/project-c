
class ApiError(Exception):
    code = None

    def __init__(self, *arg, **kw):

        code = kw.pop("code", None)
        if code is not None:
            self.code = code

        super(ApiError, self).__init__(*arg, **kw)