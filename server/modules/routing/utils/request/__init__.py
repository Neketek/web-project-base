from functools import wraps
from modules.models.sql.session import ScopedSession
from modules.exceptions import CaptchaError
import requests
from modules.config import google
from flask import request
import json as jsonlib
from . import csrf


def timezone(func):
    '''
    request decorator which gets timezone name from timezone cookie
    '''
    @wraps(func)
    def timezone_wrapper(*args, **kwargs):
        tz = request.cookies.get('timezone')
        return func(timezone=tz, *args, **kwargs)
    return timezone_wrapper


def sql_session(func):
    '''
    request decorator which initializes
    sql db session and closes it after request function finishes
    '''
    @wraps(func)
    def sql_session_wrapper(*args, **kwars):

        sql_session = ScopedSession()
        try:
            result = func(sql_session=sql_session, *args, **kwars)
            return result
        except Exception as e:
            sql_session.rollback()
            raise e
        finally:
            ScopedSession.remove()

    return sql_session_wrapper


def recaptcha_verificator(captcha_response):
    response = requests.post(
        "https://www.google.com/recaptcha/api/siteverify",
        dict(
            secret=google.RECAPTCHA_SERCRET,
            response=captcha_response
        )
    ).json()
    if not response['success']:
        raise CaptchaError(message="Captcha verification failed")


def recaptcha_json_verificator(json, captcha_key):
    try:
        captcha_response = json[captcha_key]
    except KeyError:
        raise CaptchaError(message="User captcha response was not found")
    recaptcha_verificator(captcha_response)


def json(
    source="body",
    captcha=False,
    form_key="json",
    captcha_key="captcha"
):

    if source == "body":
        def get_json(): return request.get_json(silent=True)
    elif source == "form":
        def get_json(): return jsonlib.loads(request.form.get(form_key, "{}"))
    else:
        raise ValueError("Unknown json source! [{0}]".format(source))

    if captcha:
        def verify_captcha(data): recaptcha_json_verificator(data, captcha_key)
    else:
        def verify_captcha(data): pass

    def json_data_decorator(func):
        @wraps(func)
        def json_data_wrapper(*args, **kwargs):
            json_data = get_json()
            verify_captcha(json_data)
            return func(json=json_data, *args, **kwargs)
        return json_data_wrapper

    return json_data_decorator


def files(func):
    '''
    request decorator which exctracts files list
    from request and provides it as named argument
    '''
    def files_in_request_wrapper(*args, **kwargs):
        files = request.files
        return func(files=files, *args, **kwargs)
    return files_in_request_wrapper


class SessionLoginManager:

    def get_user(self, func):
        '''
        Wrapper which sets method which returns
        user entity based on authentification data.
        To trigger unauthorized handler func should return None
        '''
        self.__get_user = func

    def __error(self, exception=None, sql_session=None):
        ''' default error handler which will reraise exception '''
        raise exception

    def __unauthorized(self, sql_session=None):
        '''default unauthorized user handled'''
        pass

    def error(self, func):
        '''wrapper which sets custom error function'''
        self.__error = func

    def unauthorized(self, func):
        '''wrapper which sets custom unauthorized user handler'''
        self.__unauthorized = func

    def required(self, func):
        ''' wrapper which provides the login functionality '''
        @wraps(func)
        @sql_session
        def authorized_request(sql_session=None, *args, **kwars):
            try:
                user = self.__get_user(sql_session=sql_session)
                if user is None:
                    def original():
                        return func(*args, **kwars)
                    return self.__unauthorized(
                        sql_session=sql_session,
                        original=original
                    )
                return func(user_context=user, *args, **kwars)
            except Exception as e:
                return self.__error(exception=e, sql_session=sql_session)

        return authorized_request
