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


pushTokenSchema.index({'token':1});

// exportar
var PushToken = mongoose.model('PushToken', pushTokenSchema);

module.exports = PushToken;