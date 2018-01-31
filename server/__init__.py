from flask import Flask
from modules.models.sql.session import Session
app = Flask(__name__)

if __name__ == '__main__':
    session = Session()
    session.close()
    app.run(debug=True,host="0.0.0.0",port=8080,threaded=True)
