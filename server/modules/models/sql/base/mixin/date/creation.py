from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy.types import TIMESTAMP
from sqlalchemy import Column, func


class CreationDateTimeMixin:
    @declared_attr
    def creation_date_time(cls):
        return Column(TIMESTAMP(), server_default=func.now(), nullable=False)
