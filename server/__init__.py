from flask import Flask
from modules.config import flask_app
from modules.models.sql.session import Session
from flask import render_template
app = Flask(__name__,template_folder=flask_app.TEMPLATE_FOLDER)

@app.route("/")
def index():
    return render_template('index.html')

if __name__ == '__main__':
    # session = Session()
    # session.close()
    app.run(debug=True,host="0.0.0.0",port=8081,threaded=True)
