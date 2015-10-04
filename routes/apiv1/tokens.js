"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var PushToken = mongoose.model('PushToken');

/**
 * @api {post} /apiv1/tokens NewPushToken.
 * @apiVersion 1.0.0
 * @apiName CreateToken
 * @apiGroup PushToken
 * @apiDescription Create a new PushToken.
 * @apiParam {String} [nombre] User name.
 * @apiParam {String} token User token.
 * @apiParam {String} plataforma User dervice plataform.
 * @apiParam {String} [lang] Locale.
 *
 * @apiSuccessExample {json} Success-Response:
 *    {
 *        "success": true,
 *        "token": {
 *            "__v": 0,
 *            "usuario": null,
 *            "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NjExMjIzNmE4NjYxMmNkM2FkNjhhYmMiLCJub21icmUiOiIxMTExIiwiZW1haWwiOiIxMTExQGdtYWlsLmNvbSIsImNsYXZlIjoiMGZmZTFhYmQxYTA4MjE1MzUzYzIzM2Q2ZTAwOTYxM2U5NWVlYzQyNTM4MzJhNzYxYWYyOGZmMzdhYzVhMTUwYyIsIl9fdiI6MCwiZGF0ZUNyZWF0ZWQiOiIyMDE1LTEwLTA0VDEyOjU3OjI2LjU1NVoifQ.QsCTd3ftIpAEGTKYPkd3980UGtSJxbZ9dblk9mV-n0c.eyJfaWQiOiI1NjEwZjc2ZjcxMTgzY2NmMzM5NTMyMzgiLCJub21icmUiOiJyYW1pcm8gMjIyIiwiZW1haWwiOiJyYW1taXJvMjIyQGdtYWlsLmNvbSIsImNsYXZlIjoiZDEwNWYzNDg3NTYxYzU3ZjBmM2M3NWRmZjUwMTgwYzYyNzg1MDZlMjhjYzEzNDIzMmYxODJmYzc2N2I0M2NkMSIsIl9fdiI6MCwiZGF0ZUNyZWF0ZWQiOiIyMDE1LTEwLTA0VDA5OjU0OjU1LjMzMVoifQ.5d1llTYM5OHVGqeWPG50TaQ-0qyaLw4GNB612x-eQRw",
 *            "plataforma": "ios",
 *            "_id": "561198d90abb3c324c696074"
 *        }
 *    }
 *
 * @apiError success false
 * @apiError error Error description
 *
 * @apiErrorExample {json} Error-Response:
 * {
 *      "success": false,
 *      "error": "TOKEN_SAVE_KO"
 *  }
 */
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