from sqlalchemy.ext.declarative import declarative_base,declared_attr
from sqlalchemy.types import BigInteger
from sqlalchemy import Column
import re


class BaseClass:

    @declared_attr
    def __tablename__(cls):
        class_name = cls.__name__
        regex = '([a-z])([A-Z])'
        name = re.sub(regex, r'\1 \2', class_name)
        name = '_'.join([token.lower() for token in name.split()])
        return name

class Entity:

    @declared_attr
    def id(cls):
        return Column(BigInteger(),primary_key=True)


BaseClass = declarative_base(cls=BaseClass)
