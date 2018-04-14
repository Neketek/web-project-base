import requests


APP_ID = "173426159970380"
APP_SECRET_KEY = "12731ec5ef95064c155f94bbfd20408f"
FACEBOOK_API_ROOT = "https://graph.facebook.com/v2.12"
# requesting access token for an app at the initialization
# caching it for future use
APP_ACCESS_TOKEN = requests.get(
    "{0}/oauth/access_token".format(FACEBOOK_API_ROOT),
    dict(
        client_id=APP_ID,
        client_secret=APP_SECRET_KEY,
        grant_type="client_credentials"
    )
).json()['access_token']
