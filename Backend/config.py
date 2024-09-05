import os

class Config:
    SECRET_KEY=os.environ.get('SECRET_KEY') or 'clave'
    MONGO_URI = 'mongodb://localhost:27017/portal_reservas'