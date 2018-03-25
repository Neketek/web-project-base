from flask import session
from modules.controllers.base import ControllerBase


class Get(ControllerBase):
    def get_user_session_data(self):
        uid = session.get('uid')
        token = session.get('token')
        return dict(uid=uid, token=token)
