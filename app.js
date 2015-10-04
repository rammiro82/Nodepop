var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var i18n = new (require('i18n-2'))({
    // setup some locales - other locales default to the first locale
    locales: ['es', 'en'],
    defaultLocale: 'es'
});
// definimos de manera global la variable i18n, para poder utiliarla en cualquier lugar.
global.i18nVar = i18n;
//var initDB = require('./init/install_bd');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./lib/moongoseConnection');
require('./models/Usuario');
require('./models/Anuncio');
require('./models/PushToken');

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.use('/apiv1/usuarios', require('./routes/apiv1/usuarios'));
app.use('/apiv1/anuncios', require('./routes/apiv1/anuncios'));
app.use('/apiv1/tokens',   require('./routes/apiv1/tokens'));
app.use('/apiv1',          require('./routes/apiv1/authenticate'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
