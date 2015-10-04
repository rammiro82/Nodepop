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
anuncioSchema.statics.lista = function( criterios, start, callback) {

    // uso .find sin callback para que me de un objeto query sin ejecutar
    var query = Anuncio.find(criterios);

    query.skip = start;

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