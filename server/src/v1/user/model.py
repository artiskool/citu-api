from db import Db

class UserModel():
    def read(self, username, password):
        db = Db.get_instance()
        sql = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password +"' "
        return db.fetchone(sql)