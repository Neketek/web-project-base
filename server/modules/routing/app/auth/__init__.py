from flask import \
    Blueprint, jsonify, redirect, request, url_for
from modules.routing import utils
from modules.routing.app import render_app_on_get
from modules.controllers.email import Email
from modules.controllers.phone import Phone
from modules.controllers.user import User
from modules.controllers.google import Google
from modules.controllers.facebook import Facebook
from modules.controllers.session import Session
from modules.exceptions import UserFriendlyError


blueprint = Blueprint("app.auth", __name__)
url_prefix = "/app/auth"


def register(app):
    app.register_blueprint(blueprint, url_prefix=url_prefix)


@blueprint.route("/", methods=['GET'])
@render_app_on_get
def auth():
    return None


@blueprint.route("/login", methods=['POST', 'GET'])
@render_app_on_get
@utils.response.user_friendly_errors("json")
@utils.request.json
@utils.request.sql_session
@utils.request.timezone
def login(json=None, sql_session=None, timezone=None):
    user_entity =\
        User(sql_session=sql_session).Auth().Login().login(json)
    user_entity.sql_session.commit()
    Session().Edit().set_user_session_data(user_entity)\
        .set_permanent_from_json(json)
    return jsonify(dict(login=True))


@blueprint.route("/logout", methods=['POST', 'GET'])
@render_app_on_get
@utils.response.user_friendly_errors("json")
def logout():
    Session().Edit().clear_user_session_data()\
        .set_permanent(permanent=False)
    return jsonify(dict(logout=True))


@blueprint.route("/sign-up", methods=['POST', 'GET'])
@render_app_on_get
@utils.response.user_friendly_errors("json")
@utils.request.json
@utils.request.sql_session
def sign_up(json={}, sql_session=None):
    user_entity = User(sql_session=sql_session).Auth().Create().create(json)
    sql_session.commit()
    sql_session.refresh(user_entity)
    Session().Edit().set_user_session_data(user_entity)
    return jsonify(dict(signUp=True))


@blueprint.route("/login/<provider>", methods=['GET'])
@utils.response.user_friendly_errors("template")
@utils.request.sql_session
def authorize(provider=None, sql_session=None):

    provider_auth_controller = None
    if provider == 'google':
        provider_auth_controller = Google().Auth()
    elif provider == 'facebook':
        provider_auth_controller = Facebook().Auth()

    code = request.args.get('code')
    redirect_uri = request.base_url

    if provider_auth_controller is None or code is None and request.args:
        return redirect(url_for("app.auth.login"))
    if code is not None:
        user_login_controller = User(
            sql_session=sql_session
        ).Auth().Login()
        login_data = provider_auth_controller.exchange_code(
            code=code,
            redirect_uri=redirect_uri
        )
        user_login_data = dict()
        user_login_data[provider] = login_data
        user_entity = user_login_controller.login(user_login_data)
        Session().Edit().set_user_session_data(user_entity)
        sql_session.commit()
        sql_session.refresh(user_entity)
        # TODO: replace with redirect to dashboard
        return jsonify(user_entity.json())
    elif not request.args:
        return redirect(
            provider_auth_controller.get_authorization_url(
                redirect_uri=redirect_uri
            )
        )


@blueprint.route("/sign-up/check/<entity>", methods=['POST'])
@utils.response.user_friendly_errors("json")
@utils.request.json
@utils.request.sql_session
def check(entity=None, json={}, sql_session=None):
    if entity == 'email':
        Controller = Phone
    elif entity == 'phone':
        Controller = Email
    else:
        raise UserFriendlyError("Can't check:{0}!".format(entity))
    try:
        value = json[entity]
    except KeyError as e:
        raise UserFriendlyError(
            "Can't find '{0}' in payload!".format(entity)
        )
    free = not Controller(sql_session=sql_session).Get().is_used_by_user(value)
    return jsonify(dict(free=free))
