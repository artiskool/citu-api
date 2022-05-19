from flask import request, jsonify
from v1.user.model import UserModel

class UserController():
    _instance = None

    def __init__(self) -> None:
        self._instance = UserModel()

    def get(self, username, password):
        user = self._instance.read(username, password)
        return user