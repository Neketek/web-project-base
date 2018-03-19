from flask import session


class Get:
    def get_user_session_data(self):
        uid = session.get('uid')
        token = session.get('token')
        return dict(uid=uid, token=token)
