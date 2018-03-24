from modules.models import sql
from modules.models import query
from sqlalchemy.orm.exc import NoResultFound
from modules.exceptions import MissingValueException, UserFriendlyException


class Get:

    def is_used_by_user(self, email):
        email = email.strip().lower()
        try:
            user_entity = \
                self.query(query.sql.user.get_by)(email=email).one()
            return True
        except NoResultFound:
            return False
