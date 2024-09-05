from flask import Blueprint, request, jsonify
from app import mongo
from bson import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash

bp = Blueprint('routes', __name__)

# Rutas de Usuario
@bp.route('/usuarios', methods=['POST'])
def create_usuario():
    data = request.json
    if mongo.db.usuarios.find_one({'email': data['email']}):
        return jsonify({"msg": "El usuario ya existe"}), 400
    
    # Cambiamos el método de hash a pbkdf2:sha256
    hashed_password = generate_password_hash(data['contraseña'], method='pbkdf2:sha256')
    data['contraseña'] = hashed_password
    mongo.db.usuarios.insert_one(data)
    return jsonify({"msg": "Usuario creado exitosamente"}), 201

@bp.route('/login', methods=['POST'])
def login():
    data = request.json
    usuario = mongo.db.usuarios.find_one({'email': data['email']})
    if not usuario or not check_password_hash(usuario['contraseña'], data['contraseña']):
        return jsonify({"msg": "Credenciales incorrectas"}), 401
    
    return jsonify({"msg": "Inicio de sesión exitoso", "usuario_id": str(usuario['_id'])})

@bp.route('/perfil/<usuario_id>', methods=['GET'])
def get_perfil(usuario_id):
    usuario = mongo.db.usuarios.find_one({'_id': ObjectId(usuario_id)}, {'contraseña': 0})
    if not usuario:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    
    # Convertir ObjectId a string
    usuario['_id'] = str(usuario['_id'])
    return jsonify(usuario)

# Rutas de Espacios
@bp.route('/espacios', methods=['POST'])
def create_espacio():
    data = request.json
    usuario_id = data.get('usuario_id')
    if not usuario_id:
        return jsonify({"msg": "Usuario no especificado"}), 400
    
    espacio = {
        "nombre": data['nombre'],
        "ubicacion": data['ubicacion'],
        "descripcion": data['descripcion'],
        "precioPorHora": data['precioPorHora'],
        "usuario_id": ObjectId(usuario_id)
    }
    mongo.db.espacios.insert_one(espacio)
    return jsonify({"msg": "Espacio creado exitosamente"}), 201

@bp.route('/espacios/<espacio_id>', methods=['PUT'])
def update_espacio(espacio_id):
    data = request.json
    result = mongo.db.espacios.update_one(
        {'_id': ObjectId(espacio_id)},
        {'$set': {
            'nombre': data['nombre'],
            'ubicacion': data['ubicacion'],
            'descripcion': data['descripcion'],
            'precioPorHora': data['precioPorHora']
        }}
    )
    if result.matched_count == 0:
        return jsonify({"msg": "Espacio no encontrado"}), 404
    
    return jsonify({"msg": "Espacio actualizado exitosamente"})

@bp.route('/espacios/<espacio_id>', methods=['DELETE'])
def delete_espacio(espacio_id):
    result = mongo.db.espacios.delete_one({'_id': ObjectId(espacio_id)})
    if result.deleted_count == 0:
        return jsonify({"msg": "Espacio no encontrado"}), 404
    
    return jsonify({"msg": "Espacio eliminado exitosamente"})

@bp.route('/espacios', methods=['GET'])
def get_espacios():
    espacios = mongo.db.espacios.find()
    return jsonify([{
        "id": str(espacio['_id']),
        "nombre": espacio['nombre'],
        "ubicacion": espacio['ubicacion'],
        "descripcion": espacio['descripcion'],
        "precioPorHora": espacio['precioPorHora']
    } for espacio in espacios])

@bp.route('/espacios/<espacio_id>', methods=['GET'])
def get_espacio(espacio_id):
    espacio = mongo.db.espacios.find_one({'_id': ObjectId(espacio_id)})
    if not espacio:
        return jsonify({"msg": "Espacio no encontrado"}), 404
    
    return jsonify({
        "id": str(espacio['_id']),
        "nombre": espacio['nombre'],
        "ubicacion": espacio['ubicacion'],
        "descripcion": espacio['descripcion'],
        "precioPorHora": espacio['precioPorHora']
    })

# Rutas de Reservas
@bp.route('/reservas', methods=['POST'])
def create_reserva():
    data = request.json
    usuario_id = data.get('usuario_id')
    espacio_id = data.get('espacio_id')
    if not usuario_id or not espacio_id:
        return jsonify({"msg": "Usuario o espacio no especificado"}), 400
    
    reserva = {
        "fecha": data['fecha'],
        "horaInicio": data['horaInicio'],
        "horaFin": data['horaFin'],
        "usuario_id": ObjectId(usuario_id),
        "espacio_id": ObjectId(espacio_id)
    }
    mongo.db.reservas.insert_one(reserva)
    return jsonify({"msg": "Reserva creada exitosamente"}), 201

@bp.route('/reservas/usuario/<usuario_id>', methods=['GET'])
def get_reservas_usuario(usuario_id):
    reservas = mongo.db.reservas.find({"usuario_id": ObjectId(usuario_id)})
    return jsonify([{
        "id": str(reserva['_id']),
        "fecha": reserva['fecha'],
        "horaInicio": reserva['horaInicio'],
        "horaFin": reserva['horaFin'],
        "espacio_id": str(reserva['espacio_id'])
    } for reserva in reservas])

@bp.route('/reservas/<reserva_id>', methods=['DELETE'])
def cancel_reserva(reserva_id):
    result = mongo.db.reservas.delete_one({'_id': ObjectId(reserva_id)})
    if result.deleted_count == 0:
        return jsonify({"msg": "Reserva no encontrada"}), 404
    
    return jsonify({"msg": "Reserva cancelada exitosamente"})

# Rutas de Reseñas
@bp.route('/resenas', methods=['POST'])
def create_resena():
    data = request.json
    usuario_id = data.get('usuario_id')
    espacio_id = data.get('espacio_id')
    if not usuario_id or not espacio_id:
        return jsonify({"msg": "Usuario o espacio no especificado"}), 400
    
    resena = {
        "comentario": data['comentario'],
        "calificacion": data['calificacion'],
        "usuario_id": ObjectId(usuario_id),
        "espacio_id": ObjectId(espacio_id)
    }
    mongo.db.resenas.insert_one(resena)
    return jsonify({"msg": "Reseña creada exitosamente"}), 201

@bp.route('/resenas/espacio/<espacio_id>', methods=['GET'])
def get_resenas_espacio(espacio_id):
    resenas = mongo.db.resenas.find({"espacio_id": ObjectId(espacio_id)})
    return jsonify([{
        "id": str(resena['_id']),
        "comentario": resena['comentario'],
        "calificacion": resena['calificacion'],
        "usuario_id": str(resena['usuario_id'])
    } for resena in resenas])
