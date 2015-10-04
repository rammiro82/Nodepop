"use strict";

var mongoose = require('mongoose');

// definir esquema de Usuario
var usuarioSchema = mongoose.Schema({
    nombre: String,
    email: String,
    clave: String,
    dateCreated: { type: Date, default: Date.now }
});

usuarioSchema.index({'email':1},{ unique: true });

// exportar
var Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;