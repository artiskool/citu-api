from flask import Flask, jsonify, request, make_response, g
from models.dog import Dog
from db import Db

app = Flask(__name__)

#g.db = Db()
#g.db.connect()

@app.route('/')
def home():
    return "Hello Flask!"

@app.route('/dogs', methods=['POST', 'GET', 'PUT', 'DELETE'])
def dogs():
    dog = Dog()
    if str(request.method).upper() == 'POST':
        resp = dog.post(request.json)
        if resp == False:
            return make_response(jsonify({
                "error": "Failed to add. There are items in your request that are invalid."
            }), 400)
        return jsonify(resp)
    if str(request.method).upper() == 'PUT':
        return jsonify(dog.put(request.json))
    if str(request.method).upper() == 'DELETE':
        return jsonify(dog.delete(request.json))
    dogs = dog.get()
    return jsonify(dogs)

@app.route('/dogs/<dog_id>', methods=['GET', 'PUT', 'DELETE'])
def dog(dog_id):
    dog_object = Dog()
    dog = dog_object.get({"id": dog_id})
    if dog is None:
        return make_response(jsonify({"error": "Dog id not found."}), 404)
    if str(request.method).upper() == 'PUT':
        dog_data = request.json
        dog_data['id'] = dog_id
        resp = dog_object.put(dog_data)
        if resp == False:
            return make_response(jsonify({
                "error": "Failed to update. There are items in your request that are invalid."
            }), 400)
        return jsonify(resp)
    if str(request.method).upper() == 'DELETE':
        return jsonify(dog_object.delete(dog_id))
    return jsonify(dog)

if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0',port=6000)