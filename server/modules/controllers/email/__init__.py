from ..base import ControllerBase
from .get import Get


class Email(
    ControllerBase
):
    INTEGRATE = (Get,)
