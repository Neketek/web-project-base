from modules.models import sql
from sqlalchemy.orm.exc import NoResultFound
from modules.exceptions import MissingValueException, UserFriendlyException


class Get:

    def is_used_by_user(self, phone):
        try:
            phone_entity = self.sql_session\
                .query(sql.Phone)\
                .filter(sql.Phone.number == phone.strip())\
                .one()
            return phone_entity.user is not None
        except NoResultFound:
            return False
