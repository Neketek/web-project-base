from modules.controllers.base import ControllerBase
from .get import Get
from .auth import Auth


class Facebook(ControllerBase):
    INTEGRATE = (Get, Auth)
