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
        '''wrapper which sets method which returns user entity based on authentification data'''
        self.__get_user = func


    def __error(self,exception=None,sql_session=None):
        ''' default error handler which will reraise exception '''
        raise exception

    def error(self, func):
        '''wrapper which sets custom error function'''
        self.__error = func

    def required(self, func):
        ''' wrapper which provides the login functionality '''
        @wraps(func)
        @sql_session
        def authorized_request(sql_session=None, *args, **kwars):
            try:
                user = self.__get_user(sql_session=sql_session)
                return func(user=user, *args, **kwars)
            except Exception as e:
                return self.__error(exception=e, sql_session=sql_session)

        return authorized_request
