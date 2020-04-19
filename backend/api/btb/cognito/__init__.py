from os import environ
from enum import Enum
from btb.templates import code_template, reset_template

def set_parameters(event, subject, body):
    event["response"]["emailSubject"] = subject
    event["response"]["emailMessage"] = body


# Confirm new user
SignUp = "CustomMessage_SignUp"
ResendCode = "CustomMessage_ResendCode"

# Password reset
ForgotPassword = "CustomMessage_ForgotPassword"

# not used    
AdminCreateUser = "CustomMessage_AdminCreateUser"
UpdateUserAttribute = "CustomMessage_UpdateUserAttribute"
VerifyUserAttribute = "CustomMessage_VerifyUserAttribute"
MFA = "CustomMessage_Authentication"


def handler(event, context):
    trigger = event["triggerSource"]
    request = event["request"]

    print ('trigger {} request {}'.format(trigger, request))

    if trigger == ForgotPassword:
        print ('forgot password')

        code = request["codeParameter"]
        template = reset_template(code)

        # print ('template {} {}'.format(template.subject, template.body))

        set_parameters(event, template.subject, template.body)
        return event

    if trigger == SignUp or trigger == ResendCode:
        print ('signup or resendcode')

        code = request["codeParameter"]
        template = code_template(code)

        # print ('template {} {}'.format(template.subject, template.body))
        
        set_parameters(event, template.subject, template.body)
        return event

    return None