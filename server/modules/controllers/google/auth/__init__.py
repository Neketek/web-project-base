from modules.controllers.base import ControllerBase
from modules.config import google
from oauth2client.client import OAuth2WebServerFlow, FlowExchangeError
from modules.exceptions import GoogleError


class Auth(ControllerBase):

    def OAuth2WebServerFlow(
        self,
        redirect_uri=None,
        scope=None
    ):
        return OAuth2WebServerFlow(
            client_id=google.CLIENT_ID,
            client_secret=google.CLIENT_SECRET,
            redirect_uri=redirect_uri,
            scope=scope
        )

    def exchange_code(
        self,
        code=None,
        redirect_uri=None,
        scope=google.DEFAULT_AUTH_SCOPE
    ):
        flow = self.OAuth2WebServerFlow(
            redirect_uri=redirect_uri,
            scope=scope
        )
        try:
            credentials = flow.step2_exchange(code)
        except ValueError as e:
            raise GoogleError("Invalid authorization request")
        except FlowExchangeError as e:
            raise GoogleError("Authorization code is invalid")
        if credentials.invalid:
            raise GoogleError("Invalid Google credentials")
        access_token = credentials.access_token
        refresh_token = credentials.refresh_token
        expiration_date_time = credentials.token_expiry
        id_token = credentials.id_token
        email_verified = id_token.get('email_verified', False)
        email = id_token.get('email')
        email = email if email_verified else None

        return dict(
            accessToken=access_token,
            accessTokenExpiresAt=expiration_date_time,
            refreshToken=refresh_token,
            email=email,
            name=dict(
                last=id_token.get('family_name'),
                first=id_token.get('given_name')
            )
        )

    def get_authorization_url(
        self,
        redirect_uri=None,
        scope=google.DEFAULT_AUTH_SCOPE
    ):

        return self\
            .OAuth2WebServerFlow(redirect_uri, scope)\
            .step1_get_authorize_url()
