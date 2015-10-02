"use strict";

var express = require('express');
var router = express.Router();

// Alternativa
var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuario');

router.get('/', function (req, res) {

    Usuario.lista({}, function(err,lista){
        if(err){
            console.log(err);
            // Al ser una api no debemos hacer next ya que el error envia un contenido web, deberiamos enviar un json
            return res.json({success:false, error:err});
        }
        //devolver una confirmación
        res.json({success: true, data: lista});
    });

});

router.get('/:nombre', function (req, res) {

    var nombre_ = req.params.nombre;

    var usuario = new Usuario({nombre:nombre_});

    usuario.get(nombre_, function (err, data) {
        if(err){
            console.log(err);
            return res.json({status:false, error:err});

        }
        console.log(data);
        return res.json({status:true, data:data});
    });

});


/* POST /apiV1/usuarios */
router.post('/', function(req, res) {
    // crear un registro de usuario
    var nuevo = req.body;

    // creamos un registro usuario
    var usuario = new Usuario(nuevo); //{nombre: 'nomUsuario', email: 'correo@eletronico.es', clave: 'contraseña'}

    usuario.save(function (err, creado) {
        if(err){
            console.log(err);
            // Al ser una api no debemos hacer next ya que el error envia un contenido web, deberiamos enviar un json
            return res.json({success:false, error:err});
        }
        //devolver una confirmación
        res.json({success: true, usuario: creado});
    });
});

module.exports = router;