from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy import Column, DateTime


class ExpirationDateTimeMixin:
    @declared_attr
    def expiration_date_time(cls):
        return Column(
            DateTime(),
            nullable=False
        )
