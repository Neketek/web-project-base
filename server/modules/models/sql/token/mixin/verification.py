from .base import BaseTokenMixin
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from modules.models.sql.base.mixin.date import\
    CreationDateTimeMixin, ModificationDateTimeMixin
from datetime import datetime, timedelta
from sqlalchemy import func
from sqlalchemy.orm.exc import NoResultFound


class VerificationTokenMixin(
    BaseTokenMixin,
    CreationDateTimeMixin,
    ModificationDateTimeMixin
):

    TOKEN_LIFESPAN = 15*16

    number_of_generations = Column(Integer(), nullable=False, default=1)

    verified = Column(Boolean(), nullable=False, default=False)

    @property
    def expired(self):
        creation = self.creation_date_time
        if creation is None:
            return None
        expiration = creation + timedelta(seconds=TOKEN_LIFESPAN)
        return self.session.query(
            expiration <= func.now().label('expired')
        ).one()['expired']

    @expired.setter
    def expired(self, value):
        raise Exception(
            "Token expiration depends only on database now()!"
        )

    def regenerate(self):
        self.number_of_generations += 1
        super().regenerate()

    def reset(self):
        self.number_of_generations = 0
        self.regenerate()
