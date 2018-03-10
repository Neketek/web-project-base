from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.types import BigInteger


class PhoneChildMixin:

    @declared_attr
    def phone_id(cls):
        return Column(BigInteger(), ForeignKey("phone.id"), nullable=False)
