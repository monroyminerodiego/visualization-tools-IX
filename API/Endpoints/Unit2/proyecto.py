import traceback
from flask_restful import Resource

from ..Utils.tables      import PostgresTables
from ..Utils.collections import MongoCollections

class Proyecto_2(Resource):
    def __init__(self):
        self.postgres   = PostgresTables()
        self.mongo      = MongoCollections()

    def get(self):
        '''
        '''
        try:
            response,code = self.postgres.get('jobs_proyect_u2')
            if code != 200: {"status":"error","info":"Fallo al consultar la base de datos","detalles":response}, 500

            return {"status":"success","info":"Endpoint sigue en construccion","detail":f"Como preview, hay {response['count']} filas en la BD"}, 200
        except:
            return {"status":"error","info":"Fallo el metodo GET","detalles":traceback.format_exc().splitlines()}, 500
        
