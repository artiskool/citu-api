from flask import Flask, Blueprint
from v1.dog.router import DogRouter

app = Flask(__name__)

bp_dogs = Blueprint('dogs', __name__, url_prefix='/v1/dogs')
DogRouter.handler(bp_dogs)
app.register_blueprint(bp_dogs)

@app.route('/cats', methods=['POST', 'GET', 'PUT', 'DELETE'])
def cats():
    cat = Cat()
    if str(request.method).upper() == 'POST':
        resp = cat.post(request.json)
        if resp == False:
            return make_response(jsonify({
                "error": "Failed to add. There are items in your request that are invalid."
            }), 400)
        return jsonify(resp)
    if str(request.method).upper() == 'PUT':
        return jsonify(cat.put(request.json))
    if str(request.method).upper() == 'DELETE':
        return jsonify(cats.delete(request.json))
    cats = cat.get()
    return jsonify(cats)

@app.route('/cats/<cat_id>', methods=['GET', 'PUT', 'DELETE'])
def cat(cat_id):
    cat_object = Cat()
    cat = cat_object.get({"id": cat_id})
    if cat is None:
        return make_response(jsonify({"error": "Cat id not found."}), 404)
    if str(request.method).upper() == 'PUT':
        cat_data = request.json
        cat_data['id'] = cat_id
        resp = cat_object.put(cat_data)
        if resp == False:
            return make_response(jsonify({
                "error": "Failed to update. There are items in your request that are invalid."
            }), 400)
        return jsonify(resp)
    if str(request.method).upper() == 'DELETE':
        return jsonify(cat_object.delete(cat_id))
    return jsonify(cat)

if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0',port=6000)