from flask import Blueprint
from v1.dog.controller import DogController

class DogRouter():
    @staticmethod
    def handler(app: Blueprint):
        controller = DogController()
        app.add_url_rule('/', methods=['POST'], view_func=controller.post)
        app.add_url_rule('/', methods=['GET'], view_func=controller.get)
        app.add_url_rule('/', methods=['PUT'], view_func=controller.put)
        app.add_url_rule('/', methods=['DELETE'], view_func=controller.delete)

        app.add_url_rule('/<dog_id>', methods=['GET'], view_func=controller.get)
        app.add_url_rule('/<dog_id>', methods=['PUT'], view_func=controller.put)
        app.add_url_rule('/<dog_id>', methods=['DELETE'], view_func=controller.delete)