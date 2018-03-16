from modules.controllers.base import ControllerBase
from .auth import Auth


class UserController(
    ControllerBase,
    Auth
):
    pass
