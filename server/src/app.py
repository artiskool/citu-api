from flask import Flask, Blueprint
from v1.dog.router import DogRouter

app = Flask(__name__)

bp_dogs = Blueprint('dogs', __name__, url_prefix='/v1/dogs')
DogRouter.handler(bp_dogs)
app.register_blueprint(bp_dogs)

if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0',port=6000)