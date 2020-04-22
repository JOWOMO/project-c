import requests
from requests.auth import HTTPBasicAuth
from urllib.parse import urljoin
import json



class JSDClientError(Exception):
    """General exception when JSD api returns an error code"""

    pass


class JSDNotFoundError(JSDClientError):
    """Raised when JSD api returns 404 error"""

    pass


class JSDAuthError(JSDClientError):
    """Raised when authentication with JSD api failed"""

    pass


class JSDClient:
    """Client for JIRA Service Desk Cloud REST Api"""

    def __init__(self, instance, service_desk_name, user, password):
        self.instance = instance

        self._base_url = f"https://{instance}.atlassian.net/rest/servicedeskapi/"
        self._base_url_exp = f"https://{instance}.atlassian.net/rest/servicedeskapi/servicedesk/{service_desk_name}/"

        self._session = requests.sessions.Session()
        self._session.headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-ExperimentalApi": "opt-in",
        }
        self._session.auth = HTTPBasicAuth(user, password)
        # https://developer.atlassian.com/cloud/jira/service-desk/rest/#api-rest-servicedeskapi-servicedesk-serviceDeskId-get
        jsd_details = self._request("GET", "", exp=True)
        self.service_desk_id = jsd_details["id"]

    def _request(self, method, endpoint, data=None, params=None, exp=False):
        if exp:
            url = urljoin(self._base_url_exp, endpoint)
        else:
            url = urljoin(self._base_url, endpoint)

        response = self._session.request(method, url, json=data, params=params)

        if response.status_code == 401:
            raise JSDAuthError("jira service desk login failed", response.json())
        if response.status_code == 404:
            raise JSDNotFoundError()
        if not response.ok:
            raise JSDClientError("jira service desk client error", response.json())

        return response.json()

    def create_or_find_user(self, name, email):
        existing = self.find_users(email)

        # race condition: sometimes it takes ~1min for a new user to be found by find_user but create_user will fail
        if existing["size"] == 1:
            return existing["values"][0]
        elif existing["size"] > 1:
            raise JSDClientError(f"multiple users for mail {email} found")

        return self.create_user(name, email)

    def find_users(self, query):
        # https://developer.atlassian.com/cloud/jira/service-desk/rest/#api-rest-servicedeskapi-servicedesk-serviceDeskId-customer-get
        return self._request("GET", "customer", params={"query": query}, exp=True)

    def create_user(self, name, email):
        # https://developer.atlassian.com/cloud/jira/service-desk/rest/#api-group-Customer
        return self._request(
            "POST", "customer", data={"fullName": name, "email": email}
        )

    def create_request(self, requestor_id, request_type, summary, description):
        # https://developer.atlassian.com/cloud/jira/service-desk/rest/#api-rest-servicedeskapi-request-post
        return self._request(
            "POST",
            "request",
            data={
                "raiseOnBehalfOf": requestor_id,
                "serviceDeskId": self.service_desk_id,
                "requestTypeId": request_type,
                "requestFieldValues": {"summary": summary, "description": description,},
            },
        )

    def get_request_types(self, query=""):
        # https://developer.atlassian.com/cloud/jira/service-desk/rest/#api-rest-servicedeskapi-servicedesk-serviceDeskId-requesttype-get
        return self._request(
            "GET", "requesttype", params={"searchQuery": query}, exp=True
        )


def dump_json(data):
    print(json.dumps(data, sort_keys=True, indent=4, separators=(",", ": ")))


def handler():
    import os

    jsdconfig = {}
    if "JOWOMO_JSD_CONFIG" not in os.environ:
        from getpass import getpass

        jsdconfig["instance_name"] = "jowomo"
        jsdconfig["project_id"] = "SUPPORT"
        jsdconfig["request_type"] = 10022
        jsdconfig["user"] = input("jsd user: ")
        jsdconfig["api_key"] = getpass("jsd api_key: ")
        # print("next time use this: JOWOMO_JSD_CONFIG=" + json.dumps(jsdconfig))
    else:
        jsdconfig = json.loads(os.environ.get("JOWOMO_JSD_CONFIG"))

    client = JSDClient(
        jsdconfig["instance_name"],
        jsdconfig["project_id"],
        jsdconfig["user"],
        jsdconfig["api_key"],
    )

    user = client.create_or_find_user("Test User", "tester@example.org")
    dump_json(user)

    req = client.create_request(
        user["accountId"], jsdconfig["request_type"], "test summary", "test description"
    )
    dump_json(req)

    types = client.get_request_types()
    dump_json(types)
