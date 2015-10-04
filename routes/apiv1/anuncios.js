"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Anuncio = mongoose.model('Anuncio');

// Auth con JWT
var jwtAuth = require('../../lib/jwtAuth');
router.use(jwtAuth());

/**
 * @api {get} /apiv1/anuncios List requested ads.
 * @apiVersion 1.0.0
 * @apiName GetAnuncios
 * @apiGroup Ads
 * @apiDescription List requested ads, using bellow filter parameters.
 * @apiParam {String} [tag] Tags to classify.
 * @apiParam {Boolean} [venta] ​Identify ad type; selling or searching.
 * @apiParam {String} [nombre]​ Name to filer
 * @apiParam {String} [precio]​ Used to specify price range, using min-max format.
 * @apiParam {String} [start]​​ Paginate option.
 * @apiParam {String} [limit]​ Paginate option.​
 * @apiParam {String} [sort]​ Paginate option.
 * @apiParam {String} [includeTotal]​​ Total ads count.
 * @apiParam {String} [lang] Locale.
 * @apiParam {String} token​ Registered user token.
 *
 *  @apiSuccessExample {json} Success-Response:
 *  {"success":true,
 *  "total":4,
 *  "data":
 *      [{"_id":"561046f403f553d2273f818d",
 *      "nombre":"Bicicleta",
 *      "venta":true,
 *      "precio":230.15,
 *      "foto":"bici.jpg",
 *      "__v":0,
 *      "dateCreated":"2015-10-03T21:21:56.466Z",
 *      "tags":["lifestyle","motor"]}
 *   }
 *
 * @apiError success false
 * @apiError error Error description
 * @apiError error.code Error code
 * @apiError error.message Error code
 *
 * @apiErrorExample {json} Error-Response:
 * {"success":false,
 *  "error":{
 *      "code":403,
 *      "message":"No token provided."
 *    }
 *  }
 *
 * @apiError (7XX) success false
 * @apiError (7XX) msg Error message
 *
 * @apiErrorExample {json} Error-Response:
 * {"success":false,
 *  "msg":"Not valid param precio."}
 */
router.get('/', function(req, res) {

    var tag          = req.query.tag;
    var venta        = req.query.venta;
    var nombre       = req.query.nombre;
    var precio       = req.query.precio;
    var start        = req.query.start;
    var limit        = req.query.limit;
    var sort         = req.query.sort;
    var includeTotal = req.query.includeTotal;
    var localeAux    = req.query.locale;

    console.log('Parámetros de búsqueda:' +
        '\n\ttag --> %s' +
        '\n\tventa --> %s' +
        '\n\tnombre --> %s' +
        '\n\tprecio --> %s' +
        '\n\tstart --> %s' +
        '\n\tlimit --> %s' +
        '\n\tsort --> %s' +
        '\n\tincludeTotal --> %s' +
        '\n\tlocale --> %s', tag,venta,nombre,precio,start,limit,sort,includeTotal,localeAux);

    if(localeAux){
        i18nVar.setLocale(localeAux);
    }else{
        i18nVar.setLocale(Object.getOwnPropertyDescriptor(req.headers, 'accept-language').value);
    }

    var criterios = {};

    //Validamos formato del parámetro venta
    if(venta &&
            venta.toString().toLowerCase() !== 'true' &&
            venta.toString().toLowerCase() !== 'false'
        ){
        return res.json({success:false, msg:i18nVar.__("ADS_GET_PARAM_NO_VALIDO", 'venta')});
    }else if (venta){
        criterios.venta = venta;
    }

    //Validamos formato de parámetro includeTotal
    if(includeTotal &&
            includeTotal.toString().toLowerCase() !== 'true' &&
            includeTotal.toString().toLowerCase() !== 'false'
        ){
        return res.json({success:false, msg:i18nVar.__("ADS_GET_PARAM_NO_VALIDO", 'includeTotal')});
    }

    if (tag) {
        criterios.tags = { $in:  tag};
    }

    if (nombre){
        if(nombre.length > 3){
            criterios.nombre = new RegExp('^' + nombre, 'i');
        }else{
            return res.json({success:false, msg:i18nVar.__("ADS_GET_PARAM_NO_VALIDO_CORTO", 'nombre', 3)});
        }
    }

    if(precio){
        var precioArr = precio.split('-');
        var precioOk = true;
        if(precioArr.length<2){
            //50 --> precio exacto a 50
            if(isNaN(precioArr[0])){
                precioOk = false;
            }else{
                criterios.precio = precio;
            }
        }else{
            //10-50 --> precio entre 10 y 50
            if((precioArr[0] !== '') && (precioArr[1] !== '')){
                if(isNaN(precioArr[0]) || isNaN(precioArr[1])){
                    precioOk = false;
                }else{
                    criterios.precio = { $gte: precioArr[0],
                                         $lte: precioArr[1]};
                }
            }else{
                if(precioArr[0] !== ''){
                    //10- --> precio a partir de 10
                    if(isNaN(precioArr[0])){
                        precioOk = false;
                    }else{
                        criterios.precio = { $gte: precioArr[0]};
                    }
                }else{
                    //-50 --> precio hasta 50
                    if(isNaN(precioArr[1])){
                        precioOk = false;
                    }else{
                        criterios.precio = { $lte: precioArr[1]};
                    }
                }
            }
        }
        if(!precioOk){
            return res.json({success:false, msg:i18nVar.__("ADS_GET_PARAM_NO_VALIDO", 'precio')});
        }
    }

    if(start){
        if(isNaN(start)){
            return res.json({success:false, msg:i18nVar.__("ADS_GET_PARAM_NO_VALIDO", 'start')});
        }
    }

    if(limit){
        if(isNaN(limit)){
            return res.json({success:false, msg:i18nVar.__("ADS_GET_PARAM_NO_VALIDO", 'limit')});
        }
    }

    if(sort){
        if( ['nombre','precio','venta','tag','-nombre','-precio','-venta','-tag'].indexOf(sort.toString().toLowerCase()) < 0){
            return res.json({success:false, msg:i18nVar.__("ADS_GET_PARAM_NO_VALIDO_ARRAY", 'sort', ['nombre','precio','venta','tag','-nombre','-precio','-venta','-tag'])});
        }
    }



    Anuncio.lista(criterios, start, limit, sort, function(err, lista) {
        if (err) {
            console.log(err);
            return res.json({success:false, error: err});
        }

        res.json({success:true, total:lista.length, data: lista});

    });

});


/**
 * @api {get} /apiv1/anuncios/tags List used tags.
 * @apiVersion 1.0.0
 * @apiName GetTags
 * @apiGroup Ads
 * @apiDescription List used tags from all created ads.
 * @apiParam {String} [lang] Locale.
 * @apiParam {String} token Registered user token.
 *
 *  @apiSuccessExample {json} Success-Response:
 *  {"success":true,
 *      "total":3,
 *      "data":[
 *          "lifestyle",
 *          "motor",
 *          "mobile"]
 *  }
 *
 * @apiError success false
 * @apiError error Error description
 * @apiError error.code Error code
 * @apiError error.message Error code
 *
 * @apiErrorExample {json} Error-Response:
 * {"success":false,
 *  "error":{
 *      "code":403,
 *      "message":"No token provided."
 *    }
 *  }
 */
router.get('/tags', function(req, res, next){

    if(req.query.locale){
        i18nVar.setLocale(req.query.locale);
    }else{
        i18nVar.setLocale(Object.getOwnPropertyDescriptor(req.headers, 'accept-language').value);
    }

    Anuncio.getTags(function(err, lista){
        if (err) {
            console.log(err);
            return res.json({success:false, error: err});
        }

        res.json({success:true, total:lista.length, data: lista});

    });
});

/**
 * @api {post} /apiv1/anuncios Create ads.
 * @apiVersion 1.0.0
 * @apiName PutAnuncio
 * @apiGroup Ads
 * @apiDescription Create ads.
 * @apiParam {String} [tag] Tags to classify.
 * @apiParam {Boolean} [venta] ​Identify ad type; selling or searching.
 * @apiParam {String} [nombre]​ Product name
 * @apiParam {String} [precio]​ Product price.
 * @apiParam {String} [foto]​ Product photo.
 * @apiParam {String} [lang] Locale.
 * @apiParam {String} token Registered user token.
 *
 *  @apiSuccessExample {json} Success-Response:
 *  {"success": true,
 *   "anuncio": {
 *       "__v": 0,
 *       "nombre": "iPhone 3GS YYYYY",
 *       "venta": true,
 *       "precio": 500,
 *       "foto": "iphone.png",
 *       "_id": "561192aee802c2624b2147bf",
 *       "dateCreated": "2015-10-04T20:57:18.568Z",
 *       "tags": [
 *           "lifestyle",
 *           "mobile"
 *       ]
 *   }
 * }
 *
 * @apiError success false
 * @apiError error Error description
 * @apiError error.code Error code
 * @apiError error.message Error code
 *
 * @apiErrorExample {json} Error-Response:
 * {"success":false,
 *  "error":{
 *      "code":403,
 *      "message":"No token provided."
 *    }
 *  }
 */
router.post('/', function(req, res, next) {

    if(req.query.locale){
        i18nVar.setLocale(req.query.locale);
    }else{
        i18nVar.setLocale(Object.getOwnPropertyDescriptor(req.headers, 'accept-language').value);
    }

    // crear un registro de anunicio
    var anuncio = new Anuncio(req.body); // {name:'Nuevo', age: 18}

    anuncio.save( function(err, creado) {
        if (err) {
            console.log(i18nVar.__("ADS_POST_KO") + err);
            return res.json({success:false, error: err});
        }

        // devolver una confirmación
        res.json({success:true, anuncio: creado});
    });
});

module.exports = router;