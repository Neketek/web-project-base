from modules.routing.utils.request import SessionLoginManager
from flask import request, url_for, redirect

LoginManager = SessionLoginManager()


@LoginManager.get_user
def get_user(sql_session=None):
    return None


@LoginManager.unauthorized
def unauthorized(sql_session=None):
    return redirect(url_for('login'))
