from modules.controllers.base import ControllerBase
from .auth import Auth
from .get import Get


class UserController(
    ControllerBase,
    Auth,
    Get
):
    pass
