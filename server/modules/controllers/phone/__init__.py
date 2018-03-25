from ..base import ControllerBase
from .get import Get


class Phone(
    ControllerBase
):
    INTEGRATE = (Get,)
