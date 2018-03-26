from modules.controllers.base import ControllerBase
from facepy import OAuthError, GraphAPI, SignedRequest
from modules.config.facebook import APP_SECRET_KEY, APP_ACCESS_TOKEN, APP_ID
from modules.exceptions import MissingValueException, UserFriendlyException


def access_token_debug_url(input_token=None):
    return "/debug_token?input_token={0}&access_token={1}".format(
        input_token,
        APP_ACCESS_TOKEN
    )


class Facebook(ControllerBase):

    def get_native_verified_login_data(self, data):
        try:
            access_token = data['accessToken']
            encrypted_data = data['signedRequest']
            decrypted_data = \
                SignedRequest.parse(encrypted_data, APP_SECRET_KEY)
            decrypted_data_user_id = decrypted_data['user_id']
            public_data_user_id = data['userID']
            if decrypted_data_user_id != public_data_user_id:
                raise OAuthError()
            graph = GraphAPI(access_token)
            verified_data = \
                graph.get(
                    access_token_debug_url(input_token=access_token)
                )['data']
            # print(verified_data)
            invalid_app_id = \
                verified_data['app_id'] != APP_ID
            invalid_user_id = \
                verified_data['user_id'] != decrypted_data_user_id
            if invalid_app_id or invalid_user_id:
                raise OAuthError()
            user_data = \
                graph.get('/me?fields=email,first_name,last_name')
            return dict(
                name=dict(
                    first=user_data.get('first_name', 'First'),
                    last=user_data.get('last_name', 'Last')
                ),
                email=user_data['email'],
                accessToken=access_token
            )
        except KeyError as e:
            raise MissingValueException(value=e.args[0])
