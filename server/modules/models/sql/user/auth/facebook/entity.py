from modules.models.sql.user.mixin.child import UserChildMixin
from modules.models.sql.base.model import BaseClass
# from modules.models.sql.base.mixin.entity import BaseEntityMixin
from modules.models.sql.base.mixin.date import CreationDateTimeMixin,\
    ModificationDateTimeMixin, ExpirationDateTimeMixin
from sqlalchemy.orm import relationship
from sqlalchemy import Column
from sqlalchemy.types import String


class UserAuthFacebook(
    BaseClass,
    CreationDateTimeMixin,
    ModificationDateTimeMixin,
    ExpirationDateTimeMixin,
    UserChildMixin(
        column=dict(
            primary_key=True
        )
    )
):
    user = relationship("User", back_populates="auth_facebook")
    access_token = Column(String(256), nullable=False)
