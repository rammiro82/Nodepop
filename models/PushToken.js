"use strict";

var mongoose = require('mongoose');

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