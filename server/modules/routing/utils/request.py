from functools import wraps
from modules.models.sql.session import Session, ScopedSession, SQL_DB_ENGINE


def sql_session(func):
    '''request decorator which initializes sql db session and closes it after request function finishes'''
    @wraps(func)
    def sql_session_wrapper(*args, **kwars):

        sql_session = ScopedSession()
        try:
            result = func(sql_session=sql_session, *args, **kwars)
        finally:
            ScopedSession.remove()
        return result

    return sql_session_wrapper


class SessionLoginManager:

    def get_user(self, func):
        self.__get_user = func

    def error(self, func):
        self.__error = func

    def required(self, func):
        @wraps(func)
        @sql_session
        def authorized_request(sql_session=None, *args, **kwars):
            try:
                user = self.__get_user(sql_session=sql_session)
                return func(user=user, *args, **kwars)
            except Exception as e:
                return self.__error(exception=e, sql_session=sql_session)

        return authorized_request


class JSONLoginManager:

    def __init__(self):
        pass

    def required(self, func):
        pass

    def error(self, func):
        pass
