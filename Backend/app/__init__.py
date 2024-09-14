from flask import Flask
from flask_cors import CORS
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager
from config import Config

mongo = PyMongo()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    mongo.init_app(app)
    
    CORS(app)

    jwt = JWTManager(app)
    
    from app import routes
    app.register_blueprint(routes.bp)
    
    return app