from flask import session
from modules.controllers.base import ControllerBase


class Edit(ControllerBase):

    def set_user_session_data(
        self,
        user_entity=None
    ):
        session['uid'] = user_entity.id
        session['token'] = user_entity.session.token
        return self

    def set_permanent(
        self,
        permanent=True,
        permanent_lifetime=60*24*3
    ):
        session.permanent = permanent
        session.permanent_session_lifetime = permanent_lifetime
        return self

    def clear_user_session_data(
        self
    ):
        session.pop('uid')
        session.pop('token')
        return self
