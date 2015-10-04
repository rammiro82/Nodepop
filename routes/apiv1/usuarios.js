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


/**
 * @api {post} /apiv1/usuarios/registrar NewUser.
 * @apiVersion 1.0.0
 * @apiName CreateUser
 * @apiGroup Users
 * @apiDescription Create a new user.
 * @apiParam {String} nombre User name.
 * @apiParam {String} email User email.
 * @apiParam {String} clave User password.
 * @apiParam {String} [lang] Locale.
 *
 * @apiSuccessExample {json} Success-Response:
 *    {
 *        "success": true,
 *        "usuario": {
 *            "__v": 0,
 *            "nombre": "2222",
 *            "email": "2222@gmail.com",
 *            "clave": "edee29f882543b956620b26d0ee0e7e950399b1c4222f5de05e06425b4c995e9",
 *            "_id": "561196975f5e8de84b912a14",
 *            "dateCreated": "2015-10-04T21:13:59.597Z"
 *        }
 *    }
 *
 * @apiError success false
 * @apiError msg Error description
 * @apiError error Error description
 * @apiError error.code Error code
 * @apiError error.message Error code
 *
 * @apiErrorExample {json} Error-Response:
 * {
 *   "success": false,
 *   "error": {
 *       "code": 401,
 *       "message": "Authentication failed. User not found."
 *   }
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *      "success": false,
 *      "msg": "email already registered."
 *  }
 */
router.post('/registrar', function (req, res, next) {

    var auxNom = req.body.nombre;
    var auxEmail = req.body.email;
    var auxClave = req.body.clave;
    var auxClaveSha = sha256(auxClave);

    if(req.query.locale){
        i18nVar.setLocale(req.query.locale);
    }else{
        i18nVar.setLocale(Object.getOwnPropertyDescriptor(req.headers, 'accept-language').value);
    }

    console.log('Datos de Usuario:' +
        '\n\tNombre:   %s' +
        '\n\temail:   %s' +
        '\n\tclave sha: %s', auxNom, auxEmail, auxClaveSha);

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
        clave: auxClaveSha
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