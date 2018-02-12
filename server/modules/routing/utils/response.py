from flask import jsonify
from functools import wraps
from modules.exceptions import UserFriendlyException, InternalServerException


def json(func):
    '''Request wrapper which forms json response from dict which source function returns.'''
    @wraps(func)
    def json_response_wrapper(*args, **kwargs):
        return jsonify(func(*args, **kwargs))
    return json_response_wrapper


def user_friendly_exceptions(func):
    '''Request wrapper which intercepts exceptions forms dict containgin
    error data and blocking internal server exception response
    by returning generic dict.'''
    @wraps(func)
    def user_friendly_wrapper(*args, **kwars):
        try:
            return func(*args, **kwars)
        except UserFriendlyException as e:
            return vars(e)()
        except Exception as e:
            return vars(InternalServerException())()

    return user_friendly_wrapper
