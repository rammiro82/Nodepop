"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Anuncio = mongoose.model('Anuncio');

// Auth con JWT
var jwtAuth = require('../../lib/jwtAuth');
router.use(jwtAuth());

// devuelve una lista de anuncios en JSON
/**
 * @api {get} /anuncios Lista los anuncios según los parámetros del filtro.
 * @apiName GetAnuncios
 * @apiGroup Anuncios
 */
router.get('/', function(req, res) {

    i18nVar.setLocale(Object.getOwnPropertyDescriptor(req.headers, 'accept-language').value);
/**
 anuncios?​
 tag​=mobile&
 ​venta​=false&​
 nombre​=ip&​
 precio​=50&
 ​start​=0&​
 limit​=2&​
 sort​=precio&
 ​includeTotal​=true&
 lang=es&
 ​token​=XX
 */
    var tag          = req.query.tag;
    var venta        = req.query.venta;
    var nombre       = req.query.nombre;
    var precio       = req.query.precio;
    var start        = req.query.start;
    var limit        = req.query.limit;
    var sort         = req.query.sort;
    var includeTotal = req.query.includeTotal;

    console.log('Parámetros de búsqueda:' +
        '\n\ttag --> %s' +
        '\n\tventa --> %s' +
        '\n\tnombre --> %s' +
        '\n\tprecio --> %s' +
        '\n\tstart --> %s' +
        '\n\tlimit --> %s' +
        '\n\tsort --> %s' +
        '\n\tincludeTotal --> %s', tag,venta,nombre,precio,start,limit,sort,includeTotal);

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
            return res.json({ok:false, error: err});
        }

        res.json({ok:true, total:lista.length, data: lista});

    });

});

/**
 * @api {get} /anuncios/tags Lista los tags que hay.
 * @apiName GetTags
 * @apiGroup Anuncios
 */
router.get('/tags', function(req, res, next){
    i18nVar.setLocale(Object.getOwnPropertyDescriptor(req.headers, 'accept-language').value);

    Anuncio.getTags(function(err, lista){
        if (err) {
            console.log(err);
            return res.json({ok:false, error: err});
        }

        res.json({ok:true, total:lista.length, data: lista});

    });
});

/**
 * @api {post} /anuncios Crea un anuncio.
 * @apiName PostAnuncios
 * @apiGroup Anuncios
 */
router.post('/', function(req, res, next) {

    // crear un registro de agente
    var anuncio = new Anuncio(req.body); // {name:'Nuevo', age: 18}

    anuncio.save( function(err, creado) {
        if (err) {
            console.log(i18nVar.__("ADS_POST_KO") + err);
            return res.json({ok:false, error: err});
        }

        // devolver una confirmación
        res.json({ok:true, anuncio: creado});
    });
});

module.exports = router;