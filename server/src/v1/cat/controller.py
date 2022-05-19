from flask import request, make_response, jsonify
from v1.basecontroller import BaseController
from v1.cat.model import CatModel

class CatController(BaseController):
    _instance = None

    def __init__(self) -> None:
        self._instance = CatModel()

    def post(self):
        print(request.json)
        resp = self._instance.create(request.json)
        if resp == False:
            return make_response(jsonify({
                "error": "Failed to add. There are items in your request that are invalid."
            }), 400)
        return jsonify(resp)

    def check(self, cat_id, filters=None):
        if filters is not None:
            filters['id'] = cat_id
        else:
            filters = {"id": cat_id}
        cat = self._instance.read(filters)
        if cat is None:
            return make_response(jsonify({"error": "Cat id not found."}), 404)
        return cat

    def get(self, cat_id=None):
        filters = {}
        if 'fields' in request.args:
            filters['fields'] = request.args['fields'].split(',')
        if cat_id is not None:
            cat = self.check(cat_id, filters)
            if not isinstance(cat, dict):
                return cat
            return jsonify(cat)
        filters['offset'] = int(request.args['offset']) if 'offset' in request.args else 0
        filters['limit'] = int(request.args['limit']) if 'limit' in request.args else 5
        cats = self._instance.read(filters)
        total = self._instance.read(filters, True)
        return jsonify({
            'metadata': {
                'total': total,
                'links': self.build_links(total, filters['offset'], filters['limit'])
            },
            'data': cats
        })

    def put(self, cat_id=None):
        if cat_id is not None:
            cat = self.check(cat_id)
            if not isinstance(cat, dict):
                return cat
            cat_data = request.json
            cat_data['id'] = cat_id
            resp = self._instance.update(cat_data)
            if resp == False:
                return make_response(jsonify({
                    "error": "Failed to update. There are items in your request that are invalid."
                }), 400)
            return jsonify(resp)
        return jsonify(self._instance.update(request.json))

    def delete(self, cat_id=None):
        if cat_id is not None:
            cat = self.check(cat_id)
            if not isinstance(cat, dict):
                return cat
            return jsonify(self._instance.delete(cat_id))
        return jsonify(self._instance.delete(request.json))