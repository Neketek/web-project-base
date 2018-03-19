from sqlalchemy.ext.declarative import declarative_base, declared_attr
import re
from sqlalchemy.orm.session import object_session


class BaseClass:

    @declared_attr
    def __tablename__(cls):
        class_name = cls.__name__
        regex = '([a-z])([A-Z])'
        name = re.sub(regex, r'\1 \2', class_name)
        name = '_'.join([token.lower() for token in name.split()])
        return name

    @property
    def Model(self):
        return self.__class__

    @Model.setter
    def Model(self, value):
        raise Exception("Entity Model can't be changed at runtime!")

    @property
    def sql_session(self):
        return object_session(self)

    @sql_session.setter
    def sql_session(self, value):
        raise Exception(
            "Session binding can't be set via entity.session property!")


BaseClass = declarative_base(cls=BaseClass)
