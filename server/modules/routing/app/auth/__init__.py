from flask import \
    Blueprint, render_template, redirect,\
    url_for, current_app, jsonify, request
from modules.routing import utils
from flask import session
from modules.routing.app import render_app_on_get
from modules.controllers.user import UserController
from modules.controllers.session import SessionController

blueprint = Blueprint("app.auth", __name__)
url_prefix = "/app"


def register(app):
    app.register_blueprint(blueprint, url_prefix=url_prefix)


@blueprint.route("/login", methods=['POST', 'GET'])
@render_app_on_get
@utils.response.user_friendly_exceptions
@utils.request.json
@utils.request.sql_session
def login(json=None, sql_session=None):
    user_entity = UserController(sql_session).login(json)
    SessionController(sql_session).set_user_session_data(user_entity)
    return jsonify(dict(login=True))


@blueprint.route("/sign-up", methods=['POST', 'GET'])
@render_app_on_get
@utils.response.user_friendly_exceptions
@utils.request.json
@utils.request.sql_session
def sign_up(json={}, sql_session=None):
    user_entity = UserController(sql_session).create(json)
    sql_session.commit()
    sql_session.refresh(user_entity)
    SessionController(sql_session).set_user_session_data(user_entity)
    return jsonify(dict(signUp=True))
