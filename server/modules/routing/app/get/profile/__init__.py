from flask import \
    Blueprint, render_template, redirect, url_for, current_app, jsonify
from modules.routing import utils
from modules.controllers.user import UserController
from modules.routing.app import login

blueprint = Blueprint("app.get.profile", __name__)
url_prefix = '/app/get/profile'


def register(app):
    app.register_blueprint(blueprint, url_prefix=url_prefix)


@blueprint.route("/user", methods=['POST', 'GET'])
@utils.response.user_friendly_exceptions
@utils.request.json
@login.required
def get_user_profile(user_context=None, json=None):
    json = dict(id=user_context.id)
    json_resp = UserController(user_context=user_context)\
        .get_profile(json=json)
    return jsonify(json_resp)
