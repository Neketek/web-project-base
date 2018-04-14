from modules.models import sql
from modules.models import query
from modules.exceptions import MissingValueError, InvalidLoginDataError
from sqlalchemy.orm.exc import NoResultFound
from modules.controllers.base import ControllerBase


class Login(ControllerBase):

    def __is_native_login__(self, data):
        try:
            data['native']
            return True
        except KeyError:
            return False

    def __is_facebook_login___(self, data):
        try:
            data['facebook']
            return True
        except KeyError:
            return False

    def __is_google_login__(self, data):
        try:
            data['google']
            return True
        except KeyError:
            return False

    def login(self, data):
        if self.__is_native_login__(data):
            return self.native_login(data['native'])
        elif self.__is_facebook_login___(data):
            return self.facebook_login(data['facebook'])
        elif self.__is_google_login__(data):
            return self.google_login(data['google'])
        else:
            raise InvalidLoginDataError()

    def google_login(self, data):
        try:
            email = data.get('email')
            user_entity = self.query(query.sql.user.get_by)(
                email=email
            ).one()
            access_token = data['accessToken']
            expiration_date_time = data['accessTokenExpiresAt']
            refresh_token = data['refreshToken']
            if user_entity.auth_google is None:
                user_entity.auth_google = sql.UserAuthGoogle(
                    access_token=access_token,
                    expiration_date_time=expiration_date_time,
                    refresh_token=refresh_token
                )
            else:
                user_entity.auth_google.access_token =\
                    access_token
                user_entity.auth_google.expiration_date_time =\
                    expiration_date_time
                if refresh_token is not None:
                    user_entity.auth_google.refresh_token =\
                        refresh_token
            return user_entity
        except NoResultFound:
            return self.root.Auth().Create().create_with_google_data(data)
        except KeyError as e:
            raise MissingValueError(value=e.args[0])
        raise InvalidLoginDataError()

    def facebook_login(self, data):
        try:
            expiration_date_time = data['accessTokenExpiresAt']
            access_token = data['accessToken']
            email = data['email']
            user_entity = self.query(query.sql.user.get_by)(
                email=email
            ).one()
            if user_entity.auth_facebook is None:
                user_entity.auth_facebook = \
                    sql.UserAuthFacebook(
                        access_token=access_token,
                        expiration_date_time=expiration_date_time
                    )
            else:
                user_entity.auth_facebook.access_token = access_token
                user_entity.auth_facebook.expiration_date_time = \
                    expiration_date_time
            return user_entity
        except NoResultFound:
            return self.root.Auth().Create()\
                .create_with_facebook_data(data)
        except KeyError as e:
            raise MissingValueError(value=e.args[0])
        raise InvalidLoginDataError()

    def native_login(self, data):
        try:
            email = data['email'].strip().lower()
            password = data['password']
        except KeyError as e:
            raise MissingValueError(value=e.args[0])

        try:
            user_entity = \
                self.query(query.sql.user.get_by)(email=email).one()
        except NoResultFound:
            raise InvalidLoginDataError()

        if not user_entity.password_check(password):
            raise InvalidLoginDataError()

        return user_entity

    def session_login(self, uid=None, token=None):
        if uid is None or token is None:
            return None
        try:
            user_entity = self.query(query.sql.user.get_by)(id=uid).one()
        except NoResultFound:
            return None
        return user_entity\
            if user_entity.session.token == token\
            else None
