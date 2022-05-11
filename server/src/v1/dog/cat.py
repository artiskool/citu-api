from flask import g
from db import Db

class Cat():
    def sanitize(self, cats):
        if not isinstance(cats, (list, tuple)):
            cats = [cats]
        clean_cats = []
        for cat in cats:
            if not isinstance(cat, dict):
                continue
            if not ('id' in cat and 'name' in cat):
                continue
            clean_cats.append(cat)
        return clean_cats

    def post(self, cats):
        if not isinstance(cats, (list, tuple)):
            cats = [cats]
        clean_cats = self.sanitize(cats)
        if len(cats) != len(clean_cats):
            return False
        queries = []
        for cat in clean_cats:
            sql = "INSERT INTO cats(name) VALUES(%s)"
            queries.append({"sql": sql, "bind": cat['name']})
        db = Db.get_instance()
        result = db.transactional(queries)
        return cats

    def get(self, filters=None):
        db = Db.get_instance()
        if filters is not None:
            if 'id' in filters:
                sql = "SELECT * FROM cats WHERE id = %s"
                cat = db.fetchone(sql, filters['id'])
                return cat
            # if another filter
        sql = "SELECT * FROM cats ORDER BY name"
        cats = db.fetchall(sql)
        return cats

    def put(self, cats):
        if not isinstance(cats, (list, tuple)):
            cats = [cats]
        clean_cats = self.sanitize(cats)
        if len(cats) != len(clean_cats):
            return False
        queries = []
        for cat in clean_cats:
            sql = "UPDATE cats SET name = %s WHERE id = %s"
            queries.append({"sql": sql, "bind": (cat['name'], cat['id'])})
        db = Db.get_instance()
        db.transactional(queries)
        return cats

    def delete(self, cats):
        counter = 0
        if not isinstance(cats, (list, tuple)):
            cats = [cats]
        placeholder = []
        queries = []
        for cat in cats:
            placeholder.append('%s')
        sql = "DELETE FROM cats WHERE id IN (" + ", ".join(placeholder) + ")"
        queries.append({"sql": sql, "bind": cats})
        db = Db.get_instance()
        counter = db.transactional(queries)
        return counter
