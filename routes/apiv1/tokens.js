"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var PushToken = mongoose.model('PushToken');

router.post('/registrar', function (req, res, next) {

    var usuario = req.body.email || null;
    var token = req.body.token;
    var plataforma = req.body.plataforma;

    i18nVar.setLocale(Object.getOwnPropertyDescriptor(req.headers, 'accept-language').value);

    console.log('Datos del pushToken:' +
        '\n\tusuario:   %s' +
        '\n\ttoken:   %s' +
        '\n\tplataforma: %s', usuario, token, plataforma);

    if (!token) {
        return res.json({success: false, msg: i18nVar.__('TOKEN_PUT_PARAM_NO_VALIDO', 'token')});
    }

    // Se crea un nuevo usuario
    var pushToken = new PushToken({
        usuario: usuario,
        token: token,
        plataforma: plataforma
    });

    pushToken.save(function (err, creado) {
        if (err) {
            console.log(i18nVar.__("TOKEN_SAVE_KO") + err);
            return res.json({success: false, error: i18nVar.__("TOKEN_SAVE_KO")});
        }
        //devolver una confirmación
        res.json({success: true, token: creado});
    });
});

module.exports = router;