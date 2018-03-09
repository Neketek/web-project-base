from flask import Flask
from modules.config import flask_app
from modules.routing.app.auth import blueprint as app_auth_blueprint
from modules.routing.app import blueprint as app_blueprint
from modules.routing.landing import blueprint as landing_blueprint
import sys

app = Flask(__name__, template_folder=flask_app.TEMPLATE_FOLDER)

app.register_blueprint(app_auth_blueprint,url_prefix='/app')
app.register_blueprint(app_blueprint,url_prefix='/app')
app.register_blueprint(landing_blueprint)


app.config['DEV'] = False
if __name__ == '__main__':
    if 'production' not in sys.argv:
        app.config['DEV'] = True
    app.run(debug=True, host="0.0.0.0", port=8080, threaded=True)
