from modules.controllers.base import ControllerBase
from .get import Get
from .auth import Auth


class Google(ControllerBase):

    INTEGRATE = (Get, Auth)
