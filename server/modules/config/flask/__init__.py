class Config:
    # used to quickly find which configuration is used
    DEV = False
    MAX_CONTENT_LENGTH = 1024*1024*8
    # flask.session object configuration
    SESSION_COOKIE_NAME = 'session'
    SESSION_COOKIE_HTTPONLY = False
    SESSION_COOKIE_SECURE = True
    SECRET_KEY = 'dummy_secret'
    JSONIFY_PRETTYPRINT_REGULAR = False


class Production(Config):
    SECRET_KEY = 'production_secret_key'


class Development(Config):
    DEV = True
    SESSION_COOKIE_SECURE = False
    JSONIFY_PRETTYPRINT_REGULAR = True


TEMPLATE_FOLDER = "modules/views/templates"
