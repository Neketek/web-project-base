from modules.controllers.base import ControllerBase
from modules.exceptions import FacebookError, InternalServerError
from modules.config import facebook
import requests
from .get import Get
from .auth import Auth


class Facebook(ControllerBase):
    INTEGRATE = (Get, Auth)

    def handle_user_friendly_error_response(self, response, user_friendly):
        try:
            error = response['error']
            if user_friendly:
                raise FacebookError(
                    message=error['message']
                )
            raise InternalServerError()
        except KeyError:
            pass

    def get(
        self,
        url,
        params=None,
        **kwargs
    ):
        response = requests.get(
            "{0}{1}".format(facebook.FACEBOOK_API_ROOT, url),
            params,
            **kwargs
        ).json()
        self.handle_user_friendly_error_response(
            response,
            kwargs.get('user_friendly_exception', True)
        )
        return response
