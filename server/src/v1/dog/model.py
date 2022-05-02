from db import Db

class DogModel():
    def sanitize(self, dogs):
        if not isinstance(dogs, (list, tuple)):
            dogs = [dogs]
        clean_dogs = []
        for dog in dogs:
            if not isinstance(dog, dict):
                continue
            if not ('id' in dog and 'name' in dog):
                continue
            clean_dogs.append(dog)
        return clean_dogs

    def create(self, dogs):
        if not isinstance(dogs, (list, tuple)):
            dogs = [dogs]
        clean_dogs = self.sanitize(dogs)
        if len(dogs) != len(clean_dogs):
            return False
        queries = []
        for dog in clean_dogs:
            sql = "INSERT INTO dogs(name) VALUES(%s)"
            queries.append({"sql": sql, "bind": dog['name']})
        db = Db.get_instance()
        result = db.transactional(queries)
        return dogs

    def read(self, filters=None):
        db = Db.get_instance()
        if filters is not None:
            if 'id' in filters:
                sql = "SELECT * FROM dogs WHERE id = %s"
                dog = db.fetchone(sql, filters['id'])
                return dog
            # if another filter
        sql = "SELECT * FROM dogs ORDER BY name"
        dogs = db.fetchall(sql)
        return dogs

    def update(self, dogs):
        if not isinstance(dogs, (list, tuple)):
            dogs = [dogs]
        clean_dogs = self.sanitize(dogs)
        if len(dogs) != len(clean_dogs):
            return False
        queries = []
        for dog in clean_dogs:
            sql = "UPDATE dogs SET name = %s WHERE id = %s"
            queries.append({"sql": sql, "bind": (dog['name'], dog['id'])})
        db = Db.get_instance()
        db.transactional(queries)
        return dogs

    def delete(self, dogs):
        counter = 0
        if not isinstance(dogs, (list, tuple)):
            dogs = [dogs]
        placeholder = []
        queries = []
        for dog in dogs:
            placeholder.append('%s')
        sql = "DELETE FROM dogs WHERE id IN (" + ", ".join(placeholder) + ")"
        queries.append({"sql": sql, "bind": dogs})
        db = Db.get_instance()
        counter = db.transactional(queries)
        return counter
