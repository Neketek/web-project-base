from flask import Blueprint, render_template, redirect, url_for, current_app
from modules.routing.utils import request, response
import uuid

blueprint = Blueprint("landing", __name__)
url_prefix = ""
CACHE_ID = uuid.uuid4().hex


def register(app):
    app.register_blueprint(blueprint, url_prefix=url_prefix)


@blueprint.route("/", methods=['GET'])
def landing():
    if current_app.config['DEV']:
        return render_template('dev/landing.html')
    else:
        return render_template('landing.html', cache_id=CACHE_ID)
