class Config:
    DEV = False
    MAX_CONTENT_LENGTH = 1024*1024*8
    SESSION_COOKIE_NAME = 'session'
    SESSION_COOKIE_HTTPONLY = False
    SESSION_COOKIE_SECURE = True
    SECRET_KEY = 'dummy_secret'
    JSONIFY_PRETTYPRINT_REGULAR = False


class ProductionConfig(Config):
    SECRET_KEY = 'production_secret_key'


class DevelopmentConfig(Config):
    # used to quickly find which configuration is used
    DEV = True
    # allows saving not https cookies
    SESSION_COOKIE_SECURE = False
    JSONIFY_PRETTYPRINT_REGULAR = True


TEMPLATE_FOLDER = "modules/views/templates"
