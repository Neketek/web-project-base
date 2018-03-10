from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.types import BigInteger, DateTime, Boolean, TIMESTAMP
from modules.models.sql.base.mixin.entity import BaseEntityMixin
from datetime import datetime, timedelta
from sqlalchemy.ext.declarative import declared_attr
import uuid


def token_generator(length):
    return lambda: uuid.uuid4().hex[:length]


class TokenEntityMixin(BaseEntityMixin):

    TOKEN_LIFESPAN = 15*16
    TOKEN_LENGTH = 6

    def regenerate_token(self):
        self.token = token_generator(self.__class__.TOKEN_LENGTH)
        self.number_of_generations += 1

    def reset_token(self):
        self.number_of_generations = 0
        self.regenerate_token()

    def is_expired(self):
        return (datetime.now()-self.creation_date_time)\
            .seconds >= self.__class__.TOKEN_LIFESPAN

    @declared_attr
    def token(cls):
        return Column(
            String(cls.TOKEN_LENGTH),
            nullable=False,
            default=token_generator(cls.TOKEN_LENGTH)
            )

    number_of_generations = Column(Integer(), nullable=False, default=1)

    verified = Column(Boolean(), nullable=False, default=False)
