from functools import wraps
from modules.models.sql.session import Session,ScopedSession


def sql_session(func):
    '''request decorator which initializes sql db session and closes it after request function finishes'''
    @wraps(func)
    def sql_session_wrapper(*args, **kwars):

        sql_session = ScopedSession()
        try:
            result = func(sql_session=sql_session, *args, **kwars)
        finally:
            print("CLOSING SESSION")
            ScopedSession.remove()
        return result

    return sql_session_wrapper
