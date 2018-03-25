from .profile import Profile
from modules.controllers.base import ControllerBase


class Get(ControllerBase):
    INTEGRATE = (Profile,)
