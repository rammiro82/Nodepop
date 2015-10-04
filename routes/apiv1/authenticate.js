"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuario');

var jwt = require('jsonwebtoken');
var config = require('./../../lib/local_config');
var sha256 = require('sha256');
var validator = require('validator');


/**
 * @api {post} /apiv1/authenticate Authenticate.
 * @apiVersion 1.0.0
 * @apiName Authenticate
 * @apiGroup Users
 * @apiDescription Validate username and password.
 * @apiParam {String} email User email.
 * @apiParam {String} clave User password.
 * @apiParam {String} [lang] Locale.
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "success": true,
 *     "message": "Enjoy your token!",
 *     "token": "XXX"
 * }
 *
 * @apiError success false
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
 *   "success": false,
 *   "error": {
 *       "code": 401,
 *       "message": "Authentication failed. Wrong password."
 *   }
 * }
 */
router.post('/authenticate', function (req, res) {

    if(req.query.locale){
        i18nVar.setLocale(req.query.locale);
    }else{
        i18nVar.setLocale(Object.getOwnPropertyDescriptor(req.headers, 'accept-language').value);
    }

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
            return res.status(500).json({success: false, error: {code: 500, message: err.message}});
        }
        if (!user) {
            return res.json({success: false, error: {code: 401, message: 'Authentication failed. User not found.'}});
        } else if (user) {

            // check if password matches
            if (user.clave != sha256(req.body.clave)) {
                res.json({success: false, error: {code: 401, message: 'Authentication failed. Wrong password.'}});
            } else {

                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, config.jwt.secret, {
                    expiresIn: config.jwt.expiresInSeconds
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });


            }

        }

    });
});

module.exports = router;