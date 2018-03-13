from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.types import BigInteger, Date, Boolean
from modules.models.sql.base.model import BaseClass
from modules.models.sql.base.mixin.entity import BaseEntityMixin
from modules.models.sql.base.mixin.date.creation import CreationDateMixin


class Email(BaseClass, BaseEntityMixin, CreationDateMixin):

    email = Column(String(128), unique=True, index=True)

    user = relationship("User", back_populates="email", uselist=False)
