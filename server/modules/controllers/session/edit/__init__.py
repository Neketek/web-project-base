from flask import session
from modules.controllers.base import ControllerBase
PERMANENT_SESSION_LIFETIME = 60*24*3


class Edit(ControllerBase):

    def set_user_session_data(
        self,
        user_entity=None
    ):
        session['uid'] = user_entity.id
        session['token'] = user_entity.session.token
        return self

    def set_permanent_from_json(self, json={}):
        permanent = json.get('permanent', False)
        permanent_lifetime = \
            json.get('permanent_lifetime', PERMANENT_SESSION_LIFETIME)
        self.set_permanent(
            permanent=permanent,
            permanent_lifetime=permanent_lifetime
        )

    def set_permanent(
        self,
        permanent=True,
        permanent_lifetime=PERMANENT_SESSION_LIFETIME
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
