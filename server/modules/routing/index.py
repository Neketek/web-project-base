from flask import Blueprint,render_template,redirect,url_for,current_app
from modules.routing.utils import request
import uuid

blueprint = Blueprint("index",__name__)

CACHE_ID = uuid.uuid4().hex

@blueprint.route("/",methods=['GET'])
def landing():
    if current_app.config['DEV']:
        return render_template('dev/landing.html')
    else:
        return render_template('landing.html',cache_id=CACHE_ID)

##TODO:I need to add login management
@request.sql_session
@blueprint.route("/app",methods=['GET'])
@blueprint.route("/app/<path:path>",methods=['GET'])
def app(path=None):
    if current_app.config['DEV']:
        return render_template('dev/app.html')
    else:
        return render_template('app.html',cache_id=CACHE_ID)
