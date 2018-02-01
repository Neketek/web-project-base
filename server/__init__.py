from flask import Flask
from modules.config import flask_app
from flask import render_template
from modules.models.sql.session import SQL_DB_ENGINE
from modules.routing.utils import request,response
import time
app = Flask(__name__,template_folder=flask_app.TEMPLATE_FOLDER)

@app.route("/")
@response.json
@response.user_friendly_exceptions
@request.sql_session
def index(sql_session=None):
    # for i in range(0,10):
    #     sql_session.execute("SELECT COUNT(*) FROM test").fetchone()
    # print(SQL_DB_ENGINE.pool.status())
    return {"test":"HELLO WORLD"}

if __name__ == '__main__':

    app.run(debug=True,host="0.0.0.0",port=8081,threaded=True)
