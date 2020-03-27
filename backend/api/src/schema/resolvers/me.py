import graphene

def me(root, info):
    context: Context = info.context
    principal = context.get_principal()

    return {
        "id": principal.get_id(),
        "email": principal.get_email(),
        "name": "Markus C"
    }
