from flask import Flask, Request, Response
from flask_graphql import GraphQLView

from db.connection import db_session
from auth import AuthMiddleware, auth_required, USER_KEY, IS_OFFLINE
from schema import executableSchema, Context
from flask import request

app = Flask(__name__)

app.wsgi_app = AuthMiddleware(app.wsgi_app)
app.debug = IS_OFFLINE

class ViewWithContext(GraphQLView):
    '''
    Workarround for ViewWithContext not accepting create_context method
    '''

    def get_context(self):
        request: Request = super().get_context()
        return Context(request.environ[USER_KEY], request)


def graphql_view():
    view = ViewWithContext.as_view(
        'graphql',
        schema=executableSchema,

        # disabled when not local
        graphiql=IS_OFFLINE,
        pretty=IS_OFFLINE,
    )

    # everything is authenticated (for now)
    return auth_required(view)

app.add_url_rule(
    '/graphql',
    view_func=graphql_view()
)

@app.teardown_appcontext    
def shutdown_session(exception=None):
    db_session.remove()

if __name__ == '__main__':
    app.run()
