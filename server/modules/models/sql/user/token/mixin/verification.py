from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.types import BigInteger, DateTime, Boolean, TIMESTAMP
from sqlalchemy.ext.declarative import declared_attr
import uuid
from modules.models.sql.base.mixin.entity import BaseEntityMixin
from modules.models.sql.user.mixin.child import UserChildMixin
from modules.models.sql.token.mixin.verification import VerificationTokenMixin


class UserVerificationTokenMixin(
    UserChildMixin(
        column=dict(
            primary_key=True
        )
    ),
    VerificationTokenMixin
):
    pass
