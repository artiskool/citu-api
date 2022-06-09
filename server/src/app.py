import json
from flask import Flask, request, jsonify, g
from v1.dog.router import DogRouter
from v1.cat.router import CatRouter
from v1.auth import login as auth_login, verify_token as auth_verify_token
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = 'I/L0ve/CIT-U'
app.config['CORS_HEADERS'] = ['Content-Type', 'authorization']

#CORS(app)
CORS(app, resources={r"*": {"origins": [
    'http://127.0.0.1:3000',
    'http://localhost:3000',
]}},  supports_credentials=True)

app.register_blueprint(DogRouter.handler())
app.register_blueprint(CatRouter.handler())

@app.route('/v1/login', methods=['POST'])
def login():
    data = request.json
    if 'username' in data and 'password' in data:
        token = auth_login(data['username'], data['password'])
        if token is not False:
            return jsonify({'token': token})
    return jsonify({'message': 'Invalid username or password'}), 403

@app.route('/v1/login')
def home():
    return jsonify({'message': 'hello world'})

@app.route('/v1/verify-token')
def verify_token():
    token = request.args.get('token')
    if not auth_verify_token(token):
        return jsonify({'message': 'Invalid token'}), 403
    return jsonify({'ok': 'Token is valid'})

if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0',port=8080)