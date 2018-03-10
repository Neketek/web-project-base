from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.types import BigInteger


class UserChildMixin:

    @declared_attr
    def user_id(cls):
        return Column(BigInteger(), ForeignKey("user.id"), nullable=False)
