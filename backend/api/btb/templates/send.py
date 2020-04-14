from flask import g, current_app
import boto3
from os import environ

def send_email(to_email, template):
    from_email=environ["EMAIL_SENDER"] if "EMAIL_SENDER" in environ else 'debug'

    if current_app.debug or to_email == "no-reply@example.com": 
        current_app.logger.debug(
            'Sending email \nfrom  : %s \nto    : %s \nsubject: %s \nbody  :\n%s', 
            from_email, to_email,
            template.subject, template.body,
        )
        return

    client = boto3.client('ses')
    response = client.send_email(
        Destination={
            'ToAddresses': [
                from_email,
            ],
        },
        Message={
            'Body': {
                'Html': {
                    'Charset': 'utft-8',
                    'Data': template.body,
                },
            },
            'Subject': {
                'Charset': 'utft-8',
                'Data': template.subject,
            },
        },
        Source=to_email,
    )
