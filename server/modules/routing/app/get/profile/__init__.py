from flask import \
    Blueprint, render_template, redirect, url_for, current_app, jsonify
from modules.routing import utils
from modules.controllers.user import User
from modules.routing.app import login

blueprint = Blueprint("app.get.profile", __name__)
url_prefix = '/app/get/profile'


def register(app):
    app.register_blueprint(blueprint, url_prefix=url_prefix)


@blueprint.route("/user", methods=['POST'])
@utils.response.user_friendly_errors("json")
@utils.request.json
@utils.request.timezone
@login.required
def user(user_context=None, timezone=None, json=None):
    json = dict(id=user_context.id) if json is None else json
    json_resp = User(user_context, timezone).Get().Profile()\
        .get(json=json)
    return jsonify(json_resp)
