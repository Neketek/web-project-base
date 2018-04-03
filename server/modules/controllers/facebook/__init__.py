from modules.controllers.base import ControllerBase
from .get import Get


class Facebook(ControllerBase):
    INTEGRATE = (Get,)
