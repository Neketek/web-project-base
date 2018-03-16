from flask import session


class Edit():
    def set_user_session_data(self, user_entity=None):
        session['uid'] = user_entity.id
        session['token'] = user_entity.session.token
        print('SAVE USER SESSION DATA')
        print(session)
        return self
