from flask_graphql import GraphQLView
from btb.api.schema import executableSchema
from btb.api.auth import auth_required


def graphql_view(debug=False):
    view = GraphQLView.as_view(
        "graphql", schema=executableSchema, graphiql=debug, pretty=debug,
    )

    # everything is authenticated (for now)
    return auth_required(view)
