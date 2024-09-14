import os

class Config:
    SECRET_KEY=os.environ.get('SECRET_KEY') or 'clave'
    MONGO_URI = 'mongodb://localhost:27017/portal_reservas'
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'clave_jwt'