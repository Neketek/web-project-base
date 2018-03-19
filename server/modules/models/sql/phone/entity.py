from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.types import BigInteger, Date
from modules.models.sql.base.model import BaseClass
from modules.models.sql.base.mixin.entity import BaseEntityMixin
from modules.models.sql.base.mixin.date import\
    CreationDateTimeMixin, ModificationDateTimeMixin


class Phone(
    BaseClass,
    BaseEntityMixin,
    CreationDateTimeMixin,
    ModificationDateTimeMixin
):

    number = Column(String(20), index=True, nullable=False)

    user = relationship("User", back_populates="phone", uselist=False)
