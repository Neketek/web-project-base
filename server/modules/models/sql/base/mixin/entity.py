from sqlalchemy.ext.declarative import declarative_base, declared_attr
from sqlalchemy.types import BigInteger, TIMESTAMP
from sqlalchemy import Column, func


class BaseEntityMixin:

    @declared_attr
    def id(cls):
        return Column(BigInteger(), primary_key=True)

    @declared_attr
    def creation_date_time(cls):
        return Column(TIMESTAMP(), server_default=func.now(), nullable=False)
