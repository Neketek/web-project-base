from flask import Blueprint, render_template, redirect, url_for, current_app
from modules.routing.utils import request, response
import uuid

blueprint = Blueprint("app", __name__)

CACHE_ID = uuid.uuid4().hex


@blueprint.route("/", methods=['GET'])
@blueprint.route("/<path:path>", methods=['GET'])
@request.sql_session
def app(path=None, sql_session=None):
    if current_app.config['DEV']:
        return render_template('dev/app.html')
    else:
        return render_template('app.html', cache_id=CACHE_ID)
