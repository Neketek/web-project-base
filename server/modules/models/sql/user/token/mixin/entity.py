from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.types import BigInteger, DateTime, Boolean, TIMESTAMP
from sqlalchemy.ext.declarative import declared_attr
import uuid
from modules.models.sql.user.mixin.child import UserChildMixin
from modules.models.sql.token.mixin.entity import TokenEntityMixin


class UserVerificationTokenMixin(
    UserChildMixin,
    TokenEntityMixin
):
    pass

# class UserEmailVerificationToken(UserVerificationTokenMixin, BaseClass):
#
#     user = relationship("User", back_populates="email_verification_token")
#
#
# class UserPhoneVerificationToken(UserVerificationTokenMixin, BaseClass):
#
#     user = relationship("User", back_populates="phone_verification_token")
#
#
