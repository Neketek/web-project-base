import re


class JsonError(Exception):

    GROUP = None
    ID = None

    @property
    def __dict__(self):
        try:
            name = self.name
        except AttributeError:
            name = self.__name__from_class_name__()
        return {
            'error': True,
            'name': name,
            'message': self.message,
            'group': self.__class__.GROUP,
            'id': self.__class__.ID
        }

    def __name__from_class_name__(self):
        class_name = self.__class__.__name__
        regex = '([a-z])([A-Z])'
        name = re.sub(regex, r'\1 \2', class_name)
        name = ' '.join([token for token in name.split()])
        return name


class UserFriendlyError(JsonError):

    GROUP = 'user'

    def __init__(
        self,
        message='Non critical error occured.',
        name=None
    ):
        self.message = message
        if name is not None:
            self.name = name


class MissingValueError(UserFriendlyError):
    def __init__(
        self,
        message="Required value '{0}' is missed!",
        value='',
        key_error=None
    ):
        if key_error is not None:
            value = key_error.args[0]
        self.message = message.format(value)


class InvalidLoginDataError(UserFriendlyError):
    def __init__(
        self,
        message='Invalid login data'
    ):
        self.message = message


class NotFoundError(UserFriendlyError):
    def __init__(
        self,
        message='Requested {0} was not found!',
        value='item'
    ):
        self.message = message.format(value)


class InternalServerError(JsonError):

    GROUP = 'internal'

    def __init__(
        self,
        message="Internal server error detected. We are sorry for this."
    ):
        self.message = message


class FacebookError(UserFriendlyError):
    def __init__(
        self,
        message="Facebook API Error"
    ):
        self.message = message
