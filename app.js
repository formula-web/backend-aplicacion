
const config = require('./config/config.js');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressjwt = require('express-jwt');
//const bodyparser = require('body-parser');
const session = require('express-session');
const cabeceraCORS = require('./middlewares/cabeceraCORS')();





// Cargar rutas a recursos (enlazan recursos http con controllers)
var rutasRouter = require('./routes/rutas');
//var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//var tiendasRouter=require('./routes/tiendas-rutas');
//var usuariosRouter=require('./routes/usuarios-rutas');
//var sesionesRouter=require('./routes/sesiones-rutas');
//var favoritasRouter=require('./routes/favoritas-rutas');

var app = express();
app.locals.yomismo="paco mendieta";

//Integrar Middleware manejo SESION en memoria
app.use(session( {
  secret:['fsdfsdfsdafdscc11rr', 'kpjffsffas'],
  saveUninitialized: false,
  resave: false
}));

//Meter Cabeceras CORs en todas las "responses" para habilitar clientes AJAX
app.use(cabeceraCORS.unless({path:'/public'}));


// rutas recursos estaticos
app.use('/css',express.static('css')); 
app.use('/js' ,express.static('views/js')); 



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
//app.use(bodyparser.json());
app.use(express.urlencoded({ extended: false }));
//app.use(bodyparser.urlencoded( {extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//PROTEGER PAGINAS - ACCESO A USUARIOS CON TOKEN JWT VALIDO EN LA REQUEST  (Si el usuario tiene token valido se asume logado ?)
//Libreria JWT:  express-jwt  para validar Tokens JWT
// Al integrarla con app.use,  express va a buscar el token jwt en todas las peticiones, excepto las mencionadas en .unless
//app.use( 
//  expressjwt( {
//    secret: config.jwtSecret, // clave secret para generar los jwt configurada en config.js
//    algorithms: ['HS256']     // algoritmos de encriptacion, obligatorio
//  })
//  .unless( { path: ['/sesiones/nueva'], method:'GET' } )   
//)


// RUTAS - añadir al stack http
//app.use('/', indexRouter);
app.use('/users', usersRouter);
//app.use(tiendasRouter);
//app.use(usuariosRouter);
//app.use(sesionesRouter);
//app.use(favoritasRouter);
app.use(rutasRouter);


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
