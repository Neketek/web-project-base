from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.types import BigInteger


class EmailChildMixin:

    @declared_attr
    def email_id(cls):
        return Column(BigInteger(), ForeignKey("email.id"), nullable=False)
