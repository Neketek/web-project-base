from ..base import ControllerBase
from .edit import Edit
from .get import Get


class SessionController(ControllerBase, Edit, Get):
    pass
