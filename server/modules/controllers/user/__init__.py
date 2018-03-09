from modules.controllers.base import ControllerBase
from modules.controllers.user.create import create
class UserController(ControllerBase):

    def create(*args):return create(*args)
