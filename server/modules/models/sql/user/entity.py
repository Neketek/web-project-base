from modules.models.sql.base.model import BaseClass
from modules.models.sql.base.mixin.entity import BaseEntityMixin
from modules.models.sql.email.mixin.child import EmailChildMixin
from modules.models.sql.phone.mixin.child import PhoneChildMixin
from modules.models.sql.base.mixin.date.creation import CreationDateMixin
from modules.models.sql.user.session.mixin.child import UserSessionChildMixin
from sqlalchemy import \
    Column, Integer, String, ForeignKey,\
    func, or_, and_, desc, asc

from sqlalchemy.orm import relationship
from sqlalchemy.types import BigInteger, Date, DateTime, Boolean, TIMESTAMP
from datetime import datetime
import hashlib
import uuid


class User(
    BaseClass,
    BaseEntityMixin,
    PhoneChildMixin(
        column=dict(
            unique=True,
            nullable=True
        )
    ),
    EmailChildMixin(
        column=dict(
            unique=True,
            nullable=False
        )
    ),
    CreationDateMixin
):

    first_name = Column(String(128), nullable=False, default="")
    last_name = Column(String(128), nullable=False, default="")

    password_hash = Column(String(256), nullable=False)
    password_salt = Column(String(64), nullable=False)

    email = relationship("Email", back_populates="user", uselist=False)
    phone = relationship("Phone", back_populates="user", uselist=False)

    email_verification_token = relationship(
        "UserEmailVerificationToken",
        back_populates="user",
        uselist=False
    )
    phone_verification_token = relationship(
        "UserPhoneVerificationToken",
        back_populates="user",
        uselist=False
    )
    password_reset_token = relationship(
        "UserPasswordResetToken",
        back_populates="user",
        uselist=False
    )

    session = relationship(
        "UserSession",
        back_populates='user',
        uselist=False
    )

    def password_check(self, password):
        password_hash = User.hash_user_password(password, self.password_salt)
        return password_hash == self.password_hash

    @staticmethod
    def hash_user_password(password, salt=None):
        salt = uuid.uuid4().hex if salt is None else salt
        password_hash = hashlib.sha512((password + salt).encode('utf-8'))\
            .hexdigest()
        return password_hash, salt
