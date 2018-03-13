from ..mixin.child import UserChildMixin
from modules.models.sql.base import BaseClass
from modules.models.sql.base.mixin.entity import BaseEnityMixin
from modules.models.sql.token.mixin.base import BaseTokenMixin


class UserSession(BaseClass, BaseEnityMixin, BaseTokenMixin):
    TOKEN_LENGTH = 64
