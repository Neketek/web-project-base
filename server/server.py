from flask import Flask
from modules.config.flask import TEMPLATE_FOLDER
from modules.routing.app.auth import register as app_auth_register
from modules.routing.app.get.profile import\
    register as app_get_profile_register
from modules.routing.app import register as app_register
from modules.routing.landing import register as landing_register
import sys

app = Flask(__name__, template_folder=TEMPLATE_FOLDER)

app_register(app)
app_auth_register(app)
app_get_profile_register(app)
landing_register(app)


if __name__ == '__main__':
    if 'prod' not in sys.argv:
        app.config.from_object('modules.config.flask.Development')
    else:
        app.config.from_object('modules.config.flask.Production')
    app.run(debug=True, host="0.0.0.0", port=8080, threaded=True)
else:
    app.config.from_object('modules.config.flask.Production')
