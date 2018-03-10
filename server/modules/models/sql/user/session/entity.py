from ..mixin.child import UserChildMixin
from modules.models.sql.base import BaseClass, Entity


class UserSession(BaseClass, Entity, UserChildMixin):
    pass
