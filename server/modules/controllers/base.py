from modules.models import sql


class ControllerBase:

    INTEGRATE = ()

    def intergrate(self, cls):

        def caller():
            return cls(
                user_context=self.user_context,
                sql_session=self.sql_session,
                timezone=self.timezone,
                root=self if self.root is None else self.root
            )
        self.__setattr__(cls.__name__, caller)

    def __init__(
        self,
        user_context=None,
        timezone='UTC',
        sql_session=None,
        root=None
    ):
        self.user_context = user_context
        self.sql_session = sql_session
        self.timezone = timezone
        self.root = root
        # print(self.__class__.__name__)
        for cls in self.__class__.INTEGRATE:
            # print(cls)
            self.intergrate(cls)

    def query(self, query_builder):
        def binded_query(**kwargs):
            return query_builder(self.sql_session, **kwargs)
        return binded_query

    @property
    def timezone(self):
        return self.__timezone__

    @timezone.setter
    def timezone(self, value):
        self.__timezone__ = value

    @property
    def sql_session(self):
        return self.user_context.sql_session \
            if self.user_context is not None\
            else self.__sql_session__

    @sql_session.setter
    def sql_session(self, value):
        # because sql_session is not instance of the ScopedSession or Session
        if value is not None and not hasattr(value, 'query'):
            raise ValueError('sql_session should have query method')
        self.__sql_session__ = value

    @property
    def user_context(self):
        return self.__user_context__

    @user_context.setter
    def user_context(self, value):
        if value is not None and not isinstance(value, sql.User):
            raise ValueError('user_context should be the instance of sql.User')
        self.__user_context__ = value
