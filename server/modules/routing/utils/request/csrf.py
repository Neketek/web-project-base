import hmac, hashlib, uuid, base64
from flask import request
from functools import wraps
from modules.config import flask, client
from modules.exceptions import CSRFError
from datetime import datetime

DEFAULT_COOKIE_NAME = "CSRF-TOKEN"
DEFAULT_HEADER_NAME = "CSRF-TOKEN"
DEFAULT_SECRET_KEY = flask.CSRF_TOKEN_SECRET_KEY.encode()
DEFAULT_DATE_TIME_FORMAT = client.DATE_TIME_FORMAT


def custom_check(
    cookie_name=None,
    header_name=None,
    secret=None
):
    def csrf_decorator(func):
        @wraps(func)
        def csrf_wrapper(*args, **kwargs):
            csrf_cookie = request.cookies.get(cookie_name)
            csrf_header = request.headers.get(header_name)
            if csrf_header != csrf_cookie:
                raise CSRFError()
            if not verify_token(secret, csrf_cookie):
                raise CSRFError()
            return func(*args, **kwargs)
        return csrf_wrapper
    return csrf_decorator


check = custom_check(
    cookie_name=DEFAULT_COOKIE_NAME,
    header_name=DEFAULT_HEADER_NAME,
    secret=DEFAULT_SECRET_KEY
)


def create_token_hmac_signature(
    secret=None,
    token=None
):
    token = token.encode()
    dig = hmac.new(secret, msg=token, digestmod=hashlib.sha256).digest()
    return base64.b64encode(dig).decode("utf-8")


def generate_token_info(
    secret=DEFAULT_SECRET_KEY,
    datetime_format=DEFAULT_DATE_TIME_FORMAT
):

    token = uuid.uuid4().hex
    generation_time = datetime.now().strftime(datetime_format)

    csrf_token = "{0}.{1}".format(generation_time, token)

    signature = create_token_hmac_signature(secret, csrf_token)

    csrf_token_authenticated = "{0}|{1}".format(csrf_token, signature)

    return csrf_token_authenticated


def verify_token(
    secret=DEFAULT_SECRET_KEY,
    token=None
):
    csrf_token, signature = token.split("|")
    computed_signature = create_token_hmac_signature(secret, csrf_token)
    return computed_signature == signature


def set_cookie(
    response,
    cookie_name=DEFAULT_COOKIE_NAME,
    token_generator_kwargs={}
):
    token_info = generate_token_info(**token_generator_kwargs)
    response.set_cookie(cookie_name, token_info)
    return response
