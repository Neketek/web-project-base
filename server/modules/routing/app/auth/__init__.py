from flask import Blueprint,render_template,redirect,url_for,current_app
from modules.routing.utils import request,response
import uuid
from modules.controllers.user import UserController

blueprint = Blueprint("auth",__name__)

@blueprint.route("/login",methods=['POST'])
@response.json
@response.user_friendly_exceptions
@request.json
@request.sql_session
def login(json=None,sql_session=None):
    return {"login":True}


@blueprint.route("/sign-up",methods=['POST'])
@response.json
@response.user_friendly_exceptions
@request.json
@request.sql_session
def sign_up(json={},sql_session=None):
    user_entity = UserController(sql_session).create(json)
    sql_session.commit()
    return {"id":user_entity.id}
