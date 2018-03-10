class JsonException(Exception):

    group = None
    id = None

    def __dict__(self):
        return {
            'name': self.__class__.__name__,
            'message': self.message,
            'group': self.__class__.group,
            'id': self.__class__.id
        }


class UserFriendlyException(JsonException):
    def __init__(
        self,
        message='Non critical error occured.'
    ):
        self.message = message


class MissingValueException(JsonException):
    def __init__(
        self,
        message="Required value '{0}' is missed!", value=''
    ):
        self.message = message.format(value)


class InternalServerException(JsonException):
    def __init__(
        self,
        message="Internal server error detected. We are sorry for this."
    ):
        self.message = message
