var express = require('express');
var router = express.Router();
const config = require('../config/config.js');

var   usuarios = require('../controllers/usuarios');
const sesiones = require("../controllers/sesiones");
const expressjwt = require('express-jwt'); // express jwt para verificar tokens jwt recibidos en la request
const Sesion = require("../controllers/sesiones");

/* Rutas a recursos http de usuarios */
router.route('/usuarios').get( /*expressjwt( { secret: config.jwtSecret, algorithms: ['HS256']  }), */ usuarios.listadoPaginado );
router.route('/usuarios/nuevo')
  .get(usuarios.formulario)

  .post(usuarios.crear, sesiones.generarToken, sesiones.enviarToken);

router.route('/usuarios/update')
  .get(usuarios.formularioUpdate)
  .post(usuarios.actualizar);

router.route('/usuarios/mistiendas')
  .get(Sesion.verificarLogin, usuarios.misTiendas)
  


 //router.route('/usuarios/:slug')
//.get(usuarios.buscar, usuarios.mostrar)
//.delete(usuarios.borrar, usuarios.buscar)
//.put(usuarios.buscar, usuarios.modificar);

//router.get('/usuarios', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

module.exports = router;
