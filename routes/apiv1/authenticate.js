"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuario');

var jwt = require('jsonwebtoken');
var config = require('./../../lib/local_config');
var sha256 = require('sha256');
var validator = require('validator');

router.post('/authenticate', function (req, res) {

    i18nVar.setLocale(Object.getOwnPropertyDescriptor(req.headers, 'accept-language').value);

    console.log('Datos de login de Usuario:' +
        '\n\temail:   %s' +
        '\n\tclave sha: %s', req.body.email, sha256(req.body.clave));

    if (!req.body.email) {
        return res.json({success: false, msg: i18nVar.__("USR_POST_AUTH_KO_EMAIL_VACIO")});
    }
    if (!req.body.clave) {
        return res.json({success: false, msg: i18nVar.__("USR_POST_AUTH_KO_CLAVE_VACIO")});
    }
    if (!validator.isEmail(req.body.email)) {
        return res.json({success: false, msg: i18nVar.__("USR_POST_AUTH_KO_EMAIL_INCORRECTO")});
    }


    // find the user
    Usuario.findOne({email: req.body.email}, function (err, user) {
        if (err) {
            return res.status(500).json({ok: false, error: {code: 500, message: err.message}});
        }
        if (!user) {
            return res.json({ok: false, error: {code: 401, message: 'Authentication failed. User not found.'}});
        } else if (user) {

            // check if password matches
            if (user.clave != sha256(req.body.clave)) {
                res.json({ok: false, error: {code: 401, message: 'Authentication failed. Wrong password.'}});
            } else {

                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, config.jwt.secret, {
                    expiresInMinutes: config.jwt.expiresInMinutes
                });

                // return the information including token as JSON
                res.json({
                    ok: true,
                    message: 'Enjoy your token!',
                    token: token
                });


            }

        }

    });
});

module.exports = router;