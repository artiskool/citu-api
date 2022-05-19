from flask import Blueprint
from v1.cat.controller import CatController

class CatRouter():
    @staticmethod
    def handler(app: Blueprint):
        controller = CatController()
        app.add_url_rule('/', methods=['POST'], view_func=controller.post)
        app.add_url_rule('/', methods=['GET'], view_func=controller.get)
        app.add_url_rule('/', methods=['PUT'], view_func=controller.put)
        app.add_url_rule('/', methods=['DELETE'], view_func=controller.delete)

        app.add_url_rule('/<cat_id>', methods=['GET'], view_func=controller.get)
        app.add_url_rule('/<cat_id>', methods=['PUT'], view_func=controller.put)
        app.add_url_rule('/<cat_id>', methods=['DELETE'], view_func=controller.delete)