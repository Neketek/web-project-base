from modules.models import sql
from sqlalchemy.orm.exc import NoResultFound
from modules.exceptions import MissingValueException, UserFriendlyException


class Create:

    def create(self, data):

        try:
            password = data['password']
            email = data['email']
            name = data['name']
            try:
                first_name = name['first']
                last_name = name['last']
            except KeyError as e:
                raise MissingValueException(value="{0} name".format(e.args[0]))
        except KeyError as e:
            raise MissingValueException(value=e.args[0])

        email_entity = None
        user_entity = None

        try:
            email_entity = self.sql_session.query(sql.Email)\
                .filter(sql.Email.email == email).one()
            try:
                self.sql_session.query(sql.User)\
                    .filter(sql.User.email == email_entity).one()
                raise UserFriendlyException(
                    message='Email is already registered'
                )
            except NoResultFound:
                pass
        except NoResultFound:
            email_entity = sql.Email(email=email)

        with self.sql_session.no_autoflush:
            user_entity = sql.User()
            user_entity.first_name = first_name
            user_entity.last_name = last_name
            user_entity.email = email_entity
            password_hash, password_salt =\
                sql.User.hash_user_password(password)
            user_entity.password_hash = password_hash
            user_entity.password_salt = password_salt
            user_entity.email_verification_token =\
                sql.UserEmailVerificationToken()
            user_entity.phone_verification_token =\
                sql.UserPhoneVerificationToken()
            user_entity.user_session = sql.UserSession()
            self.sql_session.add(user_entity)

        return user_entity
