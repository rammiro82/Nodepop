'use strict';

var mongoose = require('mongoose');
var readLine = require('readline');
var async = require('async');
var fs = require('fs');
var path = require('path');

var db = mongoose.connection;

mongoose.connect('mongodb://localhost/Nodepop');

db.once('open', function() {

    var rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('Are you sure you want to empty DB? (no) ', function(answer) {
        rl.close();
        if (answer.toLowerCase() === 'yes') {
            runInstallScript();
        } else {
            console.log('DB install aborted!');
            return process.exit(0);
        }
    });

});

/**
 *
 */
function runInstallScript() {

    console.log("iniciamos script de inicialización de la BBDD");

    async.series([
            initAnuncios,initUsuarios
    ], function (err, results){

            if (err) {
                console.error('Hubo un error: ', err);
                return process.exit(1);
            }
        return process.exit(0);
    }
);

}

/**
 *
 * @param cb
 */
function initAnuncios(cb) {

    console.log("iniciamos initAnuncios");

    var Anuncio = require('./../models/Anuncio');

    // elimino todos
    Anuncio.remove({}, function(err) {
        if(err){
            console.log(err);
            cb(err);
        }

        // Abrir el fichero
        fs.readFile(path.join(__dirname, 'anuncios.json'), {encoding: 'utf8'},function(err, data) {
            if (err) {
                console.log(err);
                return;
            }

            // convertir su contenido (JSON) en objeto
            var anunciosObjArray = JSON.parse(data);

            anunciosObjArray.anuncios.forEach((anuncioAux)=>{
                // usamos el objeto
                let anuncio = new Anuncio(anuncioAux);

                anuncio.save(function(err){
                    if (err) {
                        console.error('Error guardando Anuncio en initDB:  ', err);
                        return cb(err);
                    }

                    console.log('Guardado en la BBDD: ' + anuncio);
                });
            });

            return cb(null, anunciosObjArray.anuncios);
        });
    });

}

function initUsuarios(cb) {

    console.log("iniciamos initUsuarios");


    var Usuario = require('./../models/Usuario');

    // elimino todos
    Usuario.remove({}, function(err, data) {
        var user = new Usuario({
            'nombre': 'Ramiro',
            'email': 'rammiro82@gmail.com',
            'clave': 'ramiro'
        });

        user.save(function(err, data){
            if(err){
                console.log('Error guardando Usuario en initDB: ', err);
                return cb(err);
            }
            return cb(null, data);
        });

    });
}


//runInstallScript();