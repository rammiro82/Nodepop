"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Anuncio = mongoose.model('Anuncio');

// devuelve una lista de anuncios en JSON
router.get('/', function(req, res) {

    var criterios = {};
    if (req.query.name) {
        criterios.name = req.query.name;
    }

    Anuncio.lista(criterios, function(err, lista) {
        if (err) {
            console.log(err);
            return res.json({ok:false, error: err});
        }

        res.json({ok:true, data: lista});

    });

});

router.post('/', function(req, res, next) {

    var nuevo = req.body;

    // crear un registro de agente
    var anuncio = new Anuncio(nuevo); // {name:'Nuevo', age: 18}

    anuncio.save( function(err, creado) {
        if (err) {
            console.log(i18nVar.__("ADS_POST_KO_") + err);
            return res.json({ok:false, error: err});
        }

        // devolver una confirmación
        res.json({ok:true, anuncio: creado});

    });

});

module.exports = router;