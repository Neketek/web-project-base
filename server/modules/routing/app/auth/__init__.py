from flask import \
    Blueprint, jsonify, request
from modules.routing import utils
from flask import session
from modules.routing.app import render_app_on_get
from modules.controllers.email import Email
from modules.controllers.phone import Phone
from modules.controllers.user import User
from modules.controllers.session import Session
from modules.exceptions import UserFriendlyException


blueprint = Blueprint("app.auth", __name__)
url_prefix = "/app"


def register(app):
    app.register_blueprint(blueprint, url_prefix=url_prefix)


@blueprint.route("/login", methods=['POST', 'GET'])
@render_app_on_get
@utils.response.user_friendly_exceptions
@utils.request.json
@utils.request.sql_session
@utils.request.timezone
def login(json=None, sql_session=None, timezone=None):
    user_entity =\
        User(sql_session=sql_session).Auth().Login().login(json)
    user_entity.sql_session.commit()
    Session().Edit().set_user_session_data(user_entity)\
        .set_permanent(permanent=True)
    return jsonify(dict(login=True))


@blueprint.route("/logout", methods=['POST', 'GET'])
@render_app_on_get
@utils.response.user_friendly_exceptions
def logout():
    Session().Edit().clear_user_session_data()\
        .set_permanent(permanent=False)
    return jsonify(dict(logout=True))


@blueprint.route("/sign-up", methods=['POST', 'GET'])
@render_app_on_get
@utils.response.user_friendly_exceptions
@utils.request.json
@utils.request.sql_session
def sign_up(json={}, sql_session=None):
    user_entity = User(sql_session=sql_session).Auth().Create().create(json)
    sql_session.commit()
    sql_session.refresh(user_entity)
    Session().Edit().set_user_session_data(user_entity)
    return jsonify(dict(signUp=True))


@blueprint.route("/sign-up/check/<entity>", methods=['POST'])
@utils.response.user_friendly_exceptions
@utils.request.json
@utils.request.sql_session
def check(entity=None, json={}, sql_session=None):
    if entity == 'email':
        Controller = Phone
    elif entity == 'phone':
        Controller = Email
    else:
        raise UserFriendlyException("Can't check:{0}!".format(entity))
    try:
        value = json[entity]
    except KeyError as e:
        raise UserFriendlyException("Can't find '{0}' in json!".format(entity))
    free = not Controller(sql_session=sql_session).Get().is_used_by_user(value)
    return jsonify(dict(free=free))
