from flask import jsonify
from functools import wraps
from modules.exceptions import UserFriendlyException,InternalServerException

def json(func):
    @wraps(func)
    def json_response_wrapper(*args,**kwargs):
        return jsonify(func(*args,**kwargs))
    return json_response_wrapper

def user_friendly_exceptions(func):

    @wraps(func)
    def user_friendly_wrapper(*args,**kwars):
        try:
            return func(*args,**kwars)
        except UserFriendlyException as e:
            return vars(e)()
        except Exception as e:
            return vars(InternalServerException())()

    return user_friendly_wrapper
