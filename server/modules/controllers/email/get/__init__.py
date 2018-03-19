from modules.models import sql
from sqlalchemy.orm.exc import NoResultFound
from modules.exceptions import MissingValueException, UserFriendlyException


class Get:

    def is_used_by_user(self, email):
        try:
            email_entity = self.sql_session\
                .query(sql.Email)\
                .filter(sql.Email.email == email.strip().lower())\
                .one()
            return email_entity.user is not None
        except NoResultFound:
            return False
