from modules.models import sql
from modules.exceptions import MissingValueException, UserFriendlyException
from sqlalchemy.orm.exc import NoResultFound


class Login:

    def login(self, data):
        try:
            email = data['email']
            password = data['password']
        except KeyError as e:
            raise MissingValueException(value=e.args[0])

        try:

            email_id_query = self.sql_session.query(sql.Email.id)\
                .filter(sql.Email.email == email)\
                .subquery('email_id')

            user_entity = self.sql_session.query(sql.User)\
                .filter(sql.User.email_id == email_id_query.c.id)\
                .one()

            print('User found')

            if not user_entity.password_check(password):
                print('Password check failed')
                raise NoResultFound()

        except NoResultFound:
            raise UserFriendlyException(message='Invalid login data!')
        return user_entity
