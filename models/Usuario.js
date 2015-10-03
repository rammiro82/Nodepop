"use strict";

var mongoose = require('mongoose');

// definir esquema de Usuario
var usuarioSchema = mongoose.Schema({
    nombre: String,
    email: String,
    clave: String,
    token: String,
    userAgent: String,
    dateCreated: { type: Date, default: Date.now }
});

usuarioSchema.index({'email':1},{ unique: true });
usuarioSchema.index({'token':1});

// metodo estático que devuelve una lista de la BD
usuarioSchema.statics.lista = function( criterios, callback) {

    // uso .find sin callback para que me de un objeto query sin ejecutar
    var query = Usuario.find(criterios);

    query.sort('nombre');

    query.exec( function(err, rows) {
        if (err) {
            return callback(err);
        }

        return callback(null, rows);

    });
};

// Para crea un metodo de instancia
usuarioSchema.methods.get = function(idUsuario, callback){
    console.log(this);
    return callback(null,this);
};

// exportar
var Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;