from flask import \
    Blueprint, render_template, redirect, url_for, current_app, jsonify
from modules.routing.utils import request, response
from flask import session
import uuid
from modules.controllers.user import UserController

blueprint = Blueprint("auth", __name__)


@blueprint.route("/login", methods=['POST'])
@response.user_friendly_exceptions
@request.json
@request.sql_session
def login(json=None, sql_session=None):
    print(session.get('token'))
    user_entity = UserController(sql_session).login(json)
    session['uid'] = user_entity.id
    session['token'] = user_entity.user_session.token
    resp = jsonify({"login": True})
    return resp


@blueprint.route("/sign-up", methods=['POST'])
@response.user_friendly_exceptions
@request.json
@request.sql_session
def sign_up(json={}, sql_session=None):
    user_entity = UserController(sql_session).create(json)
    sql_session.commit()
    return jsonify({"id": user_entity.id})
