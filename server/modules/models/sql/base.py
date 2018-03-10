from sqlalchemy.ext.declarative import declarative_base, declared_attr
from sqlalchemy.types import BigInteger, TIMESTAMP
from sqlalchemy import Column, func
from functools import wraps
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
    def session(self):
        return object_session(self)

    @session.setter
    def session(self, value):
        raise Exception(
            "Session binding can't be set via entity.session property!")


class Entity:

    @declared_attr
    def id(cls):
        return Column(BigInteger(), primary_key=True)

    @declared_attr
    def creation_date_time(cls):
        return Column(TIMESTAMP(), server_default=func.now(), nullable=False)


BaseClass = declarative_base(cls=BaseClass)
