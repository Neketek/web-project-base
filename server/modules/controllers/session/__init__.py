from ..base import ControllerBase
from .edit import Edit
from .get import Get


class Session(ControllerBase):
    INTEGRATE = (Edit, Get)
