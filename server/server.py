from flask import Flask
from modules.config import flask_app
from modules.routing.index import blueprint as index_bp
import sys

app = Flask(__name__, template_folder=flask_app.TEMPLATE_FOLDER)


app.register_blueprint(index_bp)

app.config['DEV'] = False
if __name__ == '__main__':
    if 'production' not in sys.argv:
        app.config['DEV'] = True
    app.run(debug=True, host="0.0.0.0", port=8080, threaded=True)
