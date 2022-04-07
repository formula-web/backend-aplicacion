var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Entrando en home. con session.userId:", req.session.userId, req.session.jwt );
  let usuario=''; let token='';
  if ( req.session.usuario ) { usuario=req.session.usuario.email;  token=req.session.jwt; }
  res.render('index', { title: 'Express', usuario:usuario, token:token });
});

module.exports = router;
