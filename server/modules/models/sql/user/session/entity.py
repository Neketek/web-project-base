from ..mixin.child import UserChildMixin
from modules.models.sql.base.model import BaseClass
from modules.models.sql.base.mixin.entity import BaseEntityMixin
from modules.models.sql.token.mixin.base import BaseTokenMixin
from .mixin.value import UserSessionKeyValue
from modules.models.sql.user.mixin.child import UserChildMixin
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.schema import UniqueConstraint


class UserSession(
    BaseClass,
    BaseEntityMixin,
    UserChildMixin(
        column=dict(
            unique=True,
            nullable=False
        )
    ),
    BaseTokenMixin
):
    TOKEN_LENGTH = 64
    user = relationship(
        'User',
        back_populates='user_session'
    )
    integers = relationship(
        "UserSessionIntegerKeyValue",
        back_populates='user_session'
    )
    strings = relationship(
        "UserSessionStringKeyValue",
        back_populates='user_session'
    )


class UserSessionIntegerKeyValue(
    BaseClass,
    UserSessionKeyValue(
        column=dict(
            type=Integer()
        )
    )
):
    BACK_POPULATES = "integers"


class UserSessionStringKeyValue(
    BaseClass,
    UserSessionKeyValue(
        column=dict(
            type=String()
        )
    )
):
    BACK_POPULATES = "strings"
