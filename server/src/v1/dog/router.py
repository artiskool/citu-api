from flask import Blueprint
from v1.dog.controller import DogController
from v1.auth import jwt_token_required

class DogRouter():
    @staticmethod
    def handler():
        app = Blueprint('dogs', __name__, url_prefix='/v1/dogs')
        app.before_request(jwt_token_required)
        controller = DogController()
        app.add_url_rule('/', methods=['POST'], view_func=controller.post)
        app.add_url_rule('/', methods=['GET'], view_func=controller.get)
        app.add_url_rule('/', methods=['PUT'], view_func=controller.put)
        app.add_url_rule('/', methods=['DELETE'], view_func=controller.delete)
        app.add_url_rule('/<dog_id>', methods=['GET'], view_func=controller.get)
        app.add_url_rule('/<dog_id>', methods=['PUT'], view_func=controller.put)
        app.add_url_rule('/<dog_id>', methods=['DELETE'], view_func=controller.delete)
        return app