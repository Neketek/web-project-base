from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.types import BigInteger, Date
from modules.models.sql.base import BaseClass, Entity


class Phone(Entity, BaseClass):

    number = Column(String(20), index=True, nullable=False)

    user = relationship("User", back_populates="phone", uselist=False)
