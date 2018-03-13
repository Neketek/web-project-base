from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.types import BigInteger, DateTime, Boolean, TIMESTAMP
from datetime import datetime, timedelta
from sqlalchemy.ext.declarative import declared_attr
import uuid


def token_generator(length):
    return lambda: uuid.uuid4().hex[:length]


class BaseTokenMixin:

    TOKEN_LENGTH = 6

    def regenerate(self):
        self.token = token_generator(self.__class__.TOKEN_LENGTH)

    @declared_attr
    def token(cls):
        return Column(
            String(cls.TOKEN_LENGTH),
            nullable=False,
            default=token_generator(cls.TOKEN_LENGTH)
            )
