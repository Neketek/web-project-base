from modules.models.sql.user.token.mixin.verification import \
    UserVerificationTokenMixin
from sqlalchemy.orm import relationship
from modules.models.sql.base.model import BaseClass


class UserEmailVerificationToken(BaseClass, UserVerificationTokenMixin):

    user = relationship("User", back_populates="email_verification_token")
