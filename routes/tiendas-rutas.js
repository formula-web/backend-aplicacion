var express = require('express');
var router = express.Router();

var tiendas = require('../controllers/tiendas');


/* Rutas a recursos http de tiendas */
router.route('/tiendas').get( tiendas.listadoPaginado );
router.route('/tiendasall').get( tiendas.listado ).post( tiendas.ejemplo );
router.route('/tiendas/nueva').get(tiendas.formulario).post(tiendas.crear);
router.route('/tiendas/:slug')
.get(tiendas.buscar, tiendas.mostrar)
.delete(tiendas.borrar, tiendas.buscar)
.put(tiendas.buscar, tiendas.modificar);
router.route('/ficheros')
.put(tiendas.cargadorMiddleware(), tiendas.verFicheros);

//router.get('/tiendas', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

module.exports = router;
