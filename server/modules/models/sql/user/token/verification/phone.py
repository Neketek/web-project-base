from modules.models.sql.user.token.mixin.verification import \
    UserVerificationTokenMixin
from sqlalchemy.orm import relationship
from modules.models.sql.base.model import BaseClass


class UserPhoneVerificationToken(BaseClass, UserVerificationTokenMixin):

    user = relationship("User", back_populates="phone_verification_token")
