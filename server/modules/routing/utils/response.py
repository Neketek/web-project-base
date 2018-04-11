from flask import jsonify, render_template
from functools import wraps
from modules.exceptions import UserFriendlyException, InternalServerException


def json(func):
    '''
    Request wrapper which forms json
    response from dict which source function returns.
    '''
    @wraps(func)
    def json_response_wrapper(*args, **kwargs):
        return jsonify(func(*args, **kwargs))
    return json_response_wrapper


def user_friendly_exceptions(response_type="", template="error.html"):
    '''Request wrapper which intercepts exceptions, forms dict containing
    error data and blocks internal server exception response
    by returning json or template filled with exceptions data'''
    response_type = response_type.lower()
    if response_type == "json":
        def response(props):
            return jsonify(props)
    elif response_type == "template":
        def response(props):
            return render_template(template, **props)
    else:
        raise ValueError("Unknown response_type:{0}".format(response_type))

    def user_friendly_exceptions_decorator(func):
        @wraps(func)
        def user_friendly_wrapper(*args, **kwars):
            try:
                return func(*args, **kwars)
            except UserFriendlyException as e:
                return response(vars(e))
            except Exception as e:
                return response(vars(InternalServerException()))
        return user_friendly_wrapper

    return user_friendly_exceptions_decorator
