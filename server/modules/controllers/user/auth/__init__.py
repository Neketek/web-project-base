from .create import Create
from .login import Login
from modules.controllers.base import ControllerBase


class Auth(ControllerBase):
    INTEGRATE = (Create, Login,)
