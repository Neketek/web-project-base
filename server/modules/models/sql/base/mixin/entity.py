from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy.types import BigInteger, TIMESTAMP
from sqlalchemy import Column, func


class BaseEntityMixin:

    @declared_attr
    def id(cls):
        return Column(BigInteger(), primary_key=True)
