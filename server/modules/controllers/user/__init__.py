from modules.controllers.base import ControllerBase
from modules.controllers.user.create import Create
from modules.controllers.user.login import Login


class UserController(
    ControllerBase,
    Create,
    Login
):
    pass
