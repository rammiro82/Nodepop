"use strict";

var express = require('express');
var router = express.Router();
var sha256 = require('sha256');
var validator = require('validator');
var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuario');

/*
 * @api {get} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.

router.get('/', function (req, res) {

    Usuario.lista({}, function (err, lista) {
        if (err) {
            console.log(err);
            // Al ser una api no debemos hacer next ya que el error envia un contenido web, deberiamos enviar un json
            return res.json({success: false, error: err});
        }
        //devolver una confirmación
        res.json({success: true, data: lista});
    });

});
 */

/* POST */
router.post('/registrar', function (req, res, next) {

    var auxNom = req.body.nombre;
    var auxEmail = req.body.email;
    var auxClave = req.body.clave;

    i18nVar.setLocale(Object.getOwnPropertyDescriptor(req.headers, 'accept-language').value);

    console.log('Datos de Usuario:' +
        '\n\tNombre:   %s' +
        '\n\tE-Mail:   %s' +
        '\n\tPassword: %s', auxNom, auxEmail, sha256(auxClave));

    if (!auxEmail) {
        return res.json({success: false, msg: i18nVar.__("USR_POST_AUTH_KO_EMAIL_VACIO")});
    }
    if (!auxClave) {
        return res.json({success: false, msg: i18nVar.__("USR_POST_AUTH_KO_CLAVE_VACIO")});
    }
    if (!validator.isEmail(auxEmail)) {
        return res.json({success: false, msg: i18nVar.__("USR_POST_AUTH_KO_EMAIL_INCORRECTO")});
    }

    // Se crea un nuevo usuario
    var usuario = new Usuario({
        nombre: auxNom,
        email: auxEmail,
        clave: sha256(auxClave)
    });

    usuario.save(function (err, creado) {
        if (err) {
            console.log(i18nVar.__("USR_POST_AUTH_KO") + err);
            if (err.code === 11000) {// usuario duplicado
                return res.json({success: false, msg: i18nVar.__("USR_POST_AUTH_KO_DUPLICADO")});
            }
            return res.json({success: false, error: i18nVar.__("USR_POST_AUTH_KO")});
        }
        //devolver una confirmación
        res.json({success: true, usuario: creado});
    });
});

module.exports = router;