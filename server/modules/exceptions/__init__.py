class JsonException(Exception):

    GROUP = None
    ID = None

    @property
    def __dict__(self):
        return {
            'error': True,
            'name': self.__class__.__name__,
            'message': self.message,
            'group': self.__class__.GROUP,
            'id': self.__class__.ID
        }


class UserFriendlyException(JsonException):

    GROUP = 'user'

    def __init__(
        self,
        message='Non critical error occured.'
    ):
        self.message = message


class MissingValueException(UserFriendlyException):
    def __init__(
        self,
        message="Required value '{0}' is missed!",
        value='',
        key_error=None
    ):
        if key_error is not None:
            value = key_error.args[0]
        self.message = message.format(value)


class InvalidLoginData(UserFriendlyException):
    def __init__(
        self,
        message='Invalid login data'
    ):
        self.message = message


class NotFoundException(UserFriendlyException):
    def __init__(
        self,
        message='Requested {0} was not found!',
        value='item'
    ):
        self.message = message.format(value)


class InternalServerException(JsonException):

    GROUP = 'internal'

    def __init__(
        self,
        message="Internal server error detected. We are sorry for this."
    ):
        self.message = message
