var express = require('express');
var router = express.Router();
const config = require('../config/config.js');
const expressjwt = require('express-jwt'); // express jwt para verificar tokens jwt recibidos en la request

var tiendas = require('../controllers/tiendas');
const Sesion = require("../controllers/sesiones");

/* Rutas a recursos http de tiendas */
router.route('/tiendas').get( Sesion.verificarLogin, tiendas.listadoPaginado );
router.route('/tiendasall').get( tiendas.listado ).post( tiendas.ejemplo );
router.route('/tiendas/nueva').get( Sesion.verificarLogin, tiendas.formulario).post(tiendas.crear);
router.route('/tiendas/:slug')
.get(tiendas.buscar, tiendas.verificarPropietario, tiendas.mostrar)
.delete(tiendas.buscar, tiendas.verificarPropietario, tiendas.borrar)
.put(tiendas.buscar, tiendas.verificarPropietario,  tiendas.modificar);
router.route('/ficheros')
.put(tiendas.cargadorMiddleware(), tiendas.verFicheros);

//router.get('/tiendas', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

module.exports = router;
