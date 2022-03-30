
const config = require('./config/config.js');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Cargar rutas a recursos (enlazan recursos http con controllers)
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tiendasRouter=require('./routes/tiendas-rutas');
var usuariosRouter=require('./routes/usuarios-rutas');


var app = express();

// rutas recursos estaticos
app.use('/css',express.static('css')); 



//Conexion a la bbdd MongoDB usando mongoose
const bd = require('./mongo.js');
const Tienda = require('./models/tienda');
bd.connect(config.mongodb.uri, config.mongodb.dbname )
.then (( conexion )=>{ console.log("conexion OK !!!!!!!!!!!!!!!!!!")})
.catch(( error    )=>{ console.log("conexion error",err)});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// RUTAS - añadir al stack http
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(tiendasRouter);
app.use(usuariosRouter);


//MANEJO DE ERRORES
// catch 404 and forward to error handler (createError de la libreria http-errors)
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
