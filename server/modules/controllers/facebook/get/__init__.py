from modules.controllers.base import ControllerBase
from facepy import OAuthError, GraphAPI, SignedRequest
from modules.config.facebook import \
    APP_SECRET_KEY, APP_ACCESS_TOKEN, APP_ID, OAUTH_REDIRECT_URI
from modules.exceptions import MissingValueException, UserFriendlyException
from datetime import datetime
import json

def access_token_debug_url(input_token=None):
    return "/debug_token?input_token={0}&access_token={1}".format(
        input_token,
        APP_ACCESS_TOKEN
    )


def long_lived_access_token_url(input_token=None):
    return (
                "/oauth/access_token?" +
                "&grant_type=fb_exchange_token" +
                "&client_id={0}" +
                "&client_secret={1}" +
                "&redirect_uri={2}" +
                "&fb_exchange_token={3}"
            ).format(
                APP_ID,
                APP_SECRET_KEY,
                OAUTH_REDIRECT_URI,
                input_token
            )


def invalid_fb_data_error():
    return UserFriendlyException(
        message="Invalid Facebook login data!"
    )


class Get(ControllerBase):

    def get_authorization_url(
        self,
        redirect_uri=None,
        scope="public_profile,email",
        state={}
    ):
        return (
            "https://www.facebook.com/v2.12/dialog/oauth?" +
            "redirect_uri={0}" +
            "&app_id={1}"
            "&response_type=code" +
            "&scope={2}" +
            "&state=\"{3}\""
        ).format(
            redirect_uri,
            APP_ID,
            scope,
            json.dumps(state)
        )


    def get_native_verified_login_data(self, data):
        try:
            access_token = data['accessToken']
            encrypted_data = data['signedRequest']
            """
                Decoding Facebook login signed request data
                to perform fast data check by comparing user id
                from public data which can be easily spoofed.
                Also HMAC check is performed on decoding.
                If signed request data was modified HMAC check
                will fail.
            """
            decrypted_data = \
                SignedRequest.parse(encrypted_data, APP_SECRET_KEY)
            decrypted_data_user_id = decrypted_data['user_id']
            public_data_user_id = data['userID']
            if decrypted_data_user_id != public_data_user_id:
                raise invalid_fb_data_error()
            graph = GraphAPI(access_token)
            """
                Long lived access token can be used to perform server side
                Facebook related operations. At the moment of implementation
                long lived access token expires in 2 months.
            """
            long_lived_access_token =\
                graph.get(long_lived_access_token_url(access_token))
            """
                replacing short lived access token with
                with long lived access token
            """
            access_token = long_lived_access_token['access_token']
            """
                Access token debug is used to double check owner of
                the token and to get proper UTC timestamp expirations date.
            """
            verified_data = \
                graph.get(
                    access_token_debug_url(input_token=access_token)
                )['data']

            access_token_expires_at = \
                datetime.fromtimestamp(verified_data['expires_at'])

            is_invalid = not verified_data['is_valid']
            invalid_app_id = \
                verified_data['app_id'] != APP_ID
            invalid_user_id = \
                verified_data['user_id'] != decrypted_data_user_id
            if is_invalid or invalid_app_id or invalid_user_id:
                raise invalid_fb_data_error()
            user_data = \
                graph.get('/me?fields=email,first_name,last_name')
            return dict(
                name=dict(
                    first=user_data.get('first_name', 'First'),
                    last=user_data.get('last_name', 'Last')
                ),
                email=user_data['email'],
                accessToken=access_token,
                accessTokenExpiresAt=access_token_expires_at
            )
        except KeyError as e:
            raise MissingValueException(value=e.args[0])
        except OAuthError as e:
            raise invalid_fb_data_error()
