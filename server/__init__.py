from flask import Flask
from modules.config import flask_app
from flask import render_template
# from modules.models.sql.session import SQL_DB_ENGINE
# from modules.constants import database
# from modules.models.sql import User
# from modules.routing.utils import request, response

# import time
app = Flask(__name__, template_folder=flask_app.TEMPLATE_FOLDER)

# session_login = request.SessionLoginManager()

# @session_login.get_user
# def login_get_user(sql_session=None):
#     user = User(first_name="Nikita",last_name="Balakin")
#     sql_session.add(user)
#     return user

# @session_login.error
# def login_error(sql_session=None,exception=None):
#     raise exception


@app.route("/")
# @response.json
# @response.user_friendly_exceptions
# @session_login.required
def index():
    # print (database,user)
    # print (database.ADMIN_USER_ROLE(user.session))
    # print (database.ADMIN_USER_ROLE(user.session))
    # print (database.ADMIN_USER_ROLE(user.session))

    return render_template('index.html')


@app.route("/dev/")
def dev_index():
    return render_template('dev/app/neketek.html')

if __name__ == '__main__':

    app.run(debug=True, host="0.0.0.0", port=8080, threaded=True)
