from modules.models import sql
from modules.models import query
from sqlalchemy.orm.exc import NoResultFound
from modules.exceptions import MissingValueError, UserFriendlyError
from modules.controllers.base import ControllerBase


class Create(ControllerBase):

    def create_with_facebook_data(self, data):
        facebook = dict(
            accessToken=data['accessToken'],
            accessTokenExpiresAt=data['accessTokenExpiresAt']
        )
        data = dict(
            name=data['name'],
            password=sql.User.generate_random_password(),
            email=data['email']
        )
        return self.create(data, email_verified=True, facebook=facebook)

    def create_with_google_data(self, data):
        google = dict(
            accessToken=data['accessToken'],
            accessTokenExpiresAt=data['accessTokenExpiresAt']
        )
        data = dict(
            name=data['name'],
            password=sql.User.generate_random_password(),
            email=data['email']
        )
        return self.create(data, email_verified=True, google=google)

    def create(
        self,
        data,
        email_verified=False,
        phone_verified=False,
        facebook={},
        google={}
    ):

        try:
            password = data['password']
            email = data['email'].strip().lower()
            name = data['name']
            try:
                first_name = name['first'].strip()
                last_name = name['last'].strip()
            except KeyError as e:
                raise MissingValueError(value="{0} name".format(e.args[0]))
        except KeyError as e:
            raise MissingValueError(value=e.args[0])

        email_entity = None
        user_entity = None

        try:
            email_entity = \
                self.query(query.sql.email.get_by)(email=email).one()
            try:
                self.query(query.sql.user.get_by)(
                    email_id=email_entity.id
                ).one()
                raise UserFriendlyError(
                    message='Email is already registered'
                )
            except NoResultFound:
                pass
        except NoResultFound:
            email_entity = sql.Email(email=email)

        with self.sql_session.no_autoflush:
            # TODO add method to save google and facebook oauth tokens
            user_entity = sql.User()
            auth_facebook = None
            auth_google = None
            try:
                auth_facebook_kwargs = dict(
                    access_token=facebook['accessToken'],
                    expiration_date_time=facebook['accessTokenExpiresAt']
                )
                auth_facebook = sql.UserAuthFacebook(
                    **auth_facebook_kwargs
                )
            except KeyError:
                pass
            try:
                auth_google_kwargs = dict(
                    access_token=google['accessToken'],
                    expiration_date_time=google['accessTokenExpiresAt'],
                    refresh_token=google['refreshToken']
                )
                auth_google = sql.UserAuthGoogle(
                    **auth_google_kwargs
                )
            except KeyError:
                pass
            user_entity.auth_facebook = auth_facebook
            user_entity.auth_google = auth_google
            user_entity.first_name = first_name
            user_entity.last_name = last_name
            user_entity.email = email_entity
            password_hash, password_salt =\
                sql.User.hash_user_password(password)
            user_entity.password_hash = password_hash
            user_entity.password_salt = password_salt
            user_entity.email_verification_token =\
                sql.UserEmailVerificationToken(verified=email_verified)
            user_entity.phone_verification_token =\
                sql.UserPhoneVerificationToken(verified=phone_verified)
            user_entity.session = sql.UserSession()
            self.sql_session.add(user_entity)

        return user_entity
