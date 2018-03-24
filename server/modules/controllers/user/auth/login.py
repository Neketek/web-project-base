from modules.models import sql
from modules.models import query
from modules.exceptions import MissingValueException, InvalidLoginData
from sqlalchemy.orm.exc import NoResultFound


class Login:

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
            raise InvalidLoginData()

    def google_login(self, data):
        print("GOOGLE LOGIN")
        print(data)
        raise InvalidLoginData()

    def facebook_login(self, data):
        # print("FACEBOOK LOGIN")
        # print(data)
        try:
            # print(data)
            access_token = data['accessToken']
            from facepy import GraphAPI, OAuthError
            graph = GraphAPI(access_token)
            try:
                fb_data = graph.get('/me?fields=email,first_name,last_name')
                # print(fb_data)
                email = fb_data['email']
                user_entity = self.query(query.sql.user.get_by)(
                    email=email
                ).one()
                if user_entity.auth_facebook is None:
                    user_entity.auth_facebook = \
                        sql.UserAuthFacebook(access_token=access_token)
                else:
                    user_entity.auth_facebook.access_token = access_token
                return user_entity
            except OAuthError:
                raise InvalidLoginData()
            except NoResultFound:
                fb_data['accessToken'] = access_token
                return self.create_with_facebook_data(fb_data)
        except KeyError as e:
            raise MissingValueException(value=e.args[0])
        raise InvalidLoginData()

    def native_login(self, data):

        try:
            email = data['email'].strip().lower()
            password = data['password']
        except KeyError as e:
            raise MissingValueException(value=e.args[0])

        try:
            user_entity = \
                self.query(query.sql.user.get_by)(email=email).one()
        except NoResultFound:
            raise InvalidLoginData()

        if not user_entity.password_check(password):
            raise InvalidLoginData()

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
