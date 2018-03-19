from flask import Blueprint, render_template,\
    redirect, url_for, current_app, request
from modules.routing.utils.request import SessionLoginManager
from modules.controllers.session import SessionController
from modules.controllers.user import UserController
from functools import wraps
import uuid

blueprint = Blueprint("app", __name__)
url_prefix = '/app'


def register(app):
    app.register_blueprint(blueprint, url_prefix=url_prefix)


login = SessionLoginManager()


@login.get_user
def get_user(sql_session=None):
    user_session_data = SessionController(sql_session).get_user_session_data()
    print('USER SESSION DATA')
    print(user_session_data)
    return UserController(sql_session).session_login(**user_session_data)


@login.unauthorized
def unauthorized(sql_session=None, original=None):
    ignore = [
        url_for('app.auth.login'),
        url_for('app.auth.sign_up')
    ]
    if request.path not in ignore:
        return redirect(url_for('app.auth.login'))
    else:
        return original()


CACHE_ID = uuid.uuid4().hex


def render_app():
    if current_app.config['DEV']:
        return render_template('dev/app.html')
    else:
        return render_template('app.html', cache_id=CACHE_ID)


def render_app_on_get(func):
    @wraps(func)
    def render_app_wrapper(*args, **kwargs):
        if request.method == 'GET':
            return render_app()
        else:
            return func(*args, **kwargs)
    return render_app_wrapper


@blueprint.route("/", methods=['GET'])
@login.required
def app(user_context=None):
    return render_app()
