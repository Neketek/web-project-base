from flask import Flask
from modules.config import flask_app
from modules.models.sql.session import Session
from flask import render_template
from modules.routing.utils import request,response
app = Flask(__name__,template_folder=flask_app.TEMPLATE_FOLDER)

@app.route("/")
@response.json
@response.user_friendly
@request.sql_session
def index(sql_session=None):
    print (sql_session)
    raise Exception("Error")
    return {"test":"HELLO WORLD"}

if __name__ == '__main__':
    # session = Session()
    # session.close()
    app.run(debug=True,host="0.0.0.0",port=8081,threaded=True)
