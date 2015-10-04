"use strict";

var mongoose = require('mongoose');

// definir esquema de Anuncio
var anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String],
    dateCreated    : { type: Date, default: Date.now }
});

anuncioSchema.index({'nombre':1});

// metodo estático que devuelve una lista de la BD
anuncioSchema.statics.lista = function( criterios, start, limit, sort, callback) {

    // uso .find sin callback para que me de un objeto query sin ejecutar
    var query = Anuncio.find(criterios);

    query.skip(start);
    query.limit(limit);
    query.sort(sort);

    query.exec( function(err, rows) {
        if (err) {
            return callback(err);
        }

        return callback(null, rows);

    });
};

// metodo estático que devuelve una lista de tags la BD
anuncioSchema.statics.getTags = function( callback) {

    // uso .find sin callback para que me de un objeto query sin ejecutar
    var query = Anuncio.find().distinct('tags');

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