from db import Db

class CatModel():
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

    def create(self, cats):
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

    def read(self, filters=None, count_only=False):
        db = Db.get_instance()
        fields = ['*']
        offset = 0
        limit = 5
        if filters is not None:
            if 'fields' in filters:
                tmp_fields = []
                for field in filters['fields']:
                    if field in ['id', 'name']:
                        tmp_fields.append(field)
                if len(tmp_fields) > 0:
                    fields = tmp_fields
            if 'id' in filters:
                sql = "SELECT " + ','.join(fields) + " FROM cats WHERE id = %s"
                cat = db.fetchone(sql, filters['id'])
                return cat
            if 'offset' in filters:
                offset = int(filters['offset'])
            if 'limit' in filters:
                limit = int(filters['limit'])
        cols = 'COUNT(*) AS total' if count_only else ','.join(fields)
        sql = "SELECT " + cols + " FROM cats"
        if not count_only:
            sql += " ORDER BY name LIMIT " + str(offset) + ", " + str(limit)
        if count_only:
            row = db.fetchone(sql)
            return row['total'] if row else 0
        else:
            return db.fetchall(sql)

    def update(self, cats):
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
