from flask import request, make_response, jsonify
from v1.basecontroller import BaseController
from v1.dog.model import DogModel

class DogController(BaseController):
    _instance = None

    def __init__(self) -> None:
        self._instance = DogModel()

    def post(self):
        print(request.json)
        resp = self._instance.create(request.json)
        if resp == False:
            return make_response(jsonify({
                "error": "Failed to add. There are items in your request that are invalid."
            }), 400)
        return jsonify(resp)

    def check(self, dog_id, filters=None):
        if filters is not None:
            filters['id'] = dog_id
        else:
            filters = {"id": dog_id}
        dog = self._instance.read(filters)
        if dog is None:
            return make_response(jsonify({"error": "Dog id not found."}), 404)
        return dog

    def get(self, dog_id=None):
        filters = {}
        if 'fields' in request.args:
            filters['fields'] = request.args['fields'].split(',')
        if dog_id is not None:
            dog = self.check(dog_id, filters)
            if not isinstance(dog, dict):
                return dog
            return jsonify(dog)
        filters['offset'] = int(request.args['offset']) if 'offset' in request.args else 0
        filters['limit'] = int(request.args['limit']) if 'limit' in request.args else 5
        dogs = self._instance.read(filters)
        total = self._instance.read(filters, True)
        return jsonify({
            'metadata': {
                'total': total,
                'links': self.build_links(total, filters['offset'], filters['limit'])
            },
            'data': dogs
        })

    def put(self, dog_id=None):
        if dog_id is not None:
            dog = self.check(dog_id)
            if not isinstance(dog, dict):
                return dog
            dog_data = request.json
            dog_data['id'] = dog_id
            resp = self._instance.update(dog_data)
            if resp == False:
                return make_response(jsonify({
                    "error": "Failed to update. There are items in your request that are invalid."
                }), 400)
            return jsonify(resp)
        return jsonify(self._instance.update(request.json))

    def delete(self, dog_id=None):
        if dog_id is not None:
            dog = self.check(dog_id)
            if not isinstance(dog, dict):
                return dog
            return jsonify(self._instance.delete(dog_id))
        return jsonify(self._instance.delete(request.json))