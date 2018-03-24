from modules.models import sql
from modules.models import query
from sqlalchemy.orm.exc import NoResultFound
from modules.exceptions import MissingValueException, UserFriendlyException


class Get:

    def is_used_by_user(self, phone):
        phone = phone.strip()
        try:
            user_entity = \
                self.query(query.sql.user.get_by)(phone=phone).one()
            return True
        except NoResultFound:
            return False
