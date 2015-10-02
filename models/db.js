"use strict";

// Anuncio
var mongoose = require('mongoose');

// definir esquema de Anuncio
var anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

// metodo estático que devuelve una lista de la BD
anuncioSchema.statics.lista = function( criterios, callback) {

    // uso .find sin callback para que me de un objeto query sin ejecutar
    var query = Anuncio.find(criterios);

    query.sort('name');

    query.exec( function(err, rows) {
        if (err) {
            return callback(err);
        }

        return callback(null, rows);

    });
};

// exportar
var Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;


// PUSH

// definir esquema de Anuncio
var pushTokenSchema = mongoose.Schema({
    plataforma: {
        type: String,
        enum: ['ios', 'android']
    },
    token: String,
    usuario: String
});

// metodo estático que devuelve una lista de la BD
pushTokenSchema.statics.lista = function( criterios, callback) {

    // uso .find sin callback para que me de un objeto query sin ejecutar
    var query = PushToken.find(criterios);

    query.sort('name');

    query.exec( function(err, rows) {
        if (err) {
            return callback(err);
        }

        return callback(null, rows);

    });
};

// exportar
var PushToken = mongoose.model('PushToken', pushTokenSchema);

module.exports = PushToken;

// Usuario
// definir esquema de Usuario
var usuarioSchema = mongoose.Schema({
    nombre: String,
    email: String,
    clave: String
});

// metodo estático que devuelve una lista de la BD
usuarioSchema.statics.lista = function( criterios, callback) {

    // uso .find sin callback para que me de un objeto query sin ejecutar
    var query = Usuario.find(criterios);

    query.sort('name');

    query.exec( function(err, rows) {
        if (err) {
            return callback(err);
        }

        return callback(null, rows);

    });
};

// exportar
var Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;