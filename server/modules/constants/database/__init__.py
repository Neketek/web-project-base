from functools import wraps


def database_constant(func):
    '''
    Wrapper which sets module constants
    which are using getters which require database session.
    Getter will initialize constant as global module variable
    and all next calls of that constants
    will use cached value instead of calling a getter function.
    '''
    @wraps(func)
    def database_constant_getter(session=None):

        if session is None:
            raise Exception(
                "Session is None! Database constant can't be used" +
                "without active database session."
                )

        cached_value_name = '__VALUE_{0}'.format(func.__name__)
        globals_dict = globals()
        try:
            return globals_dict[cached_value_name]
        except KeyError:
            cached_value = func(session)
            globals_dict[cached_value_name] = cached_value
            return cached_value

    return database_constant_getter


@database_constant
def ADMIN_USER_ROLE(session):
    return "ADMIN"
