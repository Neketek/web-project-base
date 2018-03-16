from .child import UserSessionChildMixin
from modules.models.sql.base.mixin.date import \
    CreationDateTimeMixin, ModificationDateTimeMixin
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.types import BigInteger, DateTime, Boolean, TIMESTAMP
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy.schema import UniqueConstraint
from modules.models.sql.base.mixin.base.column import \
    base_column_mixin
from sqlalchemy.orm import relationship


class UserSessionKeyMixin(
    UserSessionChildMixin(
        column=dict(primary_key=True)
    ),
    CreationDateTimeMixin,
    ModificationDateTimeMixin
):

    @declared_attr
    def key(cls):
        return Column(
            String(64),
            nullable=False
        )

    @declared_attr
    def __table_args__(cls):
        return (
            UniqueConstraint(
                'user_session_id',
                'key',
                name=cls.__tablename__+'_key_uix'
            ),
        )

    @declared_attr
    def user_session(cls):
        return relationship(
            'UserSession',
            back_populates=cls.BACK_POPULATES
        )


@base_column_mixin(UserSessionKeyMixin)
def UserSessionKeyValue():
    return dict(
        column=dict(
            name='value'
        )
    )
