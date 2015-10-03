"use strict";

var mongoose = require('mongoose');

// definir esquema de Anuncio
var tagSchema = mongoose.Schema({
    tag: String,
    creada: {type:Date, default:Date.now}
});

// exportar
var Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;