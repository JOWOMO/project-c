import graphene
from btb.api.schema.types import Company, JSONScalar
from btb.api.models import db
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy import text
from flask import g, current_app
from btb.api.constants import InputLengths
from btb.api.schema.types.util import LimitedString
import boto3


class UserInput(graphene.InputObjectType):
    first_name = LimitedString(InputLengths.MIDDLE_STRING, required=True)
    last_name = LimitedString(InputLengths.MIDDLE_STRING, required=True)
    email = LimitedString(InputLengths.MIDDLE_STRING, required=True)


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
insert into btb_data.customer (external_id, first_name, last_name, email)
values (:id, :first_name, :last_name, :email)
on conflict (external_id)
do update set    
    first_name = excluded.first_name, 
    last_name = excluded.last_name, 
    email = excluded.email
returning id
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
