import pymysql.cursors

class Db():
    __instance = None
    connection = None
    hostname = "flask-db"
    port = "3366"
    username = "root"
    password = "root"
    database = "pets"

    def __init__(self):
        if Db.__instance is not None:
            raise Exception("This class is Singleton.")
        else:
            Db.__instance = self
            Db.__instance.connect()

    @staticmethod
    def get_instance():
        if Db.__instance is None:
            Db()
        return Db.__instance

    def connect(self, hostname=None, port=None, username=None, password=None, database=None):
        if hostname is not None:
            self.hostname = hostname
        if port is not None:
            self.port = port
        if username is not None:
            self.username = username
        if password is not None:
            self.password = password
        if database is not None:
            self.database = database
        # we can connect to the database
        self.connection = pymysql.connect(
            host=self.hostname,
            user=self.username,
            password=self.password,
            database=self.database,
            cursorclass=pymysql.cursors.DictCursor,
            autocommit=False
        )
        return self.connection

    def cursor(self):
        return self.connection.cursor()

    def execute(self, sql, bind=None):
        result = None
        with self.cursor() as cursor:
            result = cursor.execute(sql, bind)
        return result

    def query(self, sql, bind=None):
        with self.cursor() as cursor:
            cursor.execute(sql, bind)
        return cursor

    def fetchone(self, sql, bind=None):
        cursor = self.query(sql, bind)
        return cursor.fetchone()

    def fetchall(self, sql, bind=None):
        cursor = self.query(sql, bind)
        return cursor.fetchall()

    def transactional(self, queries):
        counter = 0
        try:
            for query in queries:
                counter += self.execute(query['sql'], query['bind'])
        except:
            self.connection.rollback()
            return False
        else:
            self.connection.commit()
            return counter