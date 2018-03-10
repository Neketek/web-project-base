from modules.models.sql.user.token.mixin.entity import \
    UserVerificationTokenMixin
from sqlalchemy.orm import relationship
from modules.models.sql.base.model import BaseClass


class UserPasswordResetToken(BaseClass, UserVerificationTokenMixin):

    TOKEN_LENGTH = 12

    user = relationship("User", back_populates="password_reset_token")
