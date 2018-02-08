from functools import wraps
from modules.models.sql.session import ScopedSession()

def database_constant(func):

    @wraps(func)
    def database_constant_getter(session=None):

        cached_value_name = '__VALUE_{0}'.format(func.__name__)
        globals_dict = globals()
        try:
            return globals_dict[cached_value_name]
        except KeyError:
            try:
                if session is None:
                    session = ScopedSession()
                cached_value = func(session)
                globals_dict[cached_value_name]=cached_value
                return cached_value


@database_constant
def ADMIN_USER_ROLE(session):
    return session.query(sql.UserRole).filter(sql.UserRole.name == 'admin').one()
