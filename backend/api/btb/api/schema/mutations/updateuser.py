import graphene
from btb.api.schema.types import Company, JSONScalar
from btb.api.models import db
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy import text
from flask import g, current_app
import boto3


class UserInput(graphene.InputObjectType):
    first_name = graphene.String(required=True)
    last_name = graphene.String(required=True)
    email = graphene.String(required=True)


class UpdateUser(graphene.Mutation):
    class Arguments:
        user = UserInput(required=True)

    Output = graphene.String

    @staticmethod
    def mutate(root, info, user):
        current_app.logger.debug("UpdateUser %s", user)

        with db.engine.begin() as conn:
            sql = text(
                """
update btb.customer
set     
    first_name = :first_name, 
    last_name = :last_name, 
    email = :email
where external_id = :id
            """
            )

            conn.execute(sql, {**user.__dict__, "id": g.principal.get_id()})


class S3UploadGrant(graphene.ObjectType):
    url = graphene.String(required=True)
    fields = graphene.Field(JSONScalar)

class StartUploadPicture(graphene.Mutation):
    Output = S3UploadGrant

    @staticmethod
    def mutate(root, info):
        s3_client = boto3.client('s3')

        response = s3_client.generate_presigned_post(
            'test',
            'customer_pictures/{}.jpg'.format(g.principal.get_id()),

            Conditions=[
                ['content-length-range', 100, 2 * 1000 * 1000],
                ['eq', '$Content-Type', 'image/jpeg'],
            ],
            
            ExpiresIn=600,  # 10 minutes
        )

        return response
