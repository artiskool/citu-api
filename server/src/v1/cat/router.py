from flask import Blueprint
from v1.cat.controller import CatController
from v1.auth import jwt_token_required

class CatRouter():
    @staticmethod
    def handler():
        app = Blueprint('cats', __name__, url_prefix='/v1/cats')
        app.before_request(jwt_token_required)
        controller = CatController()
        app.add_url_rule('/', methods=['POST'], view_func=controller.post)
        app.add_url_rule('/', methods=['GET'], view_func=controller.get)
        app.add_url_rule('/', methods=['PUT'], view_func=controller.put)
        app.add_url_rule('/', methods=['DELETE'], view_func=controller.delete)

        app.add_url_rule('/<cat_id>', methods=['GET'], view_func=controller.get)
        app.add_url_rule('/<cat_id>', methods=['PUT'], view_func=controller.put)
        app.add_url_rule('/<cat_id>', methods=['DELETE'], view_func=controller.delete)
        return app