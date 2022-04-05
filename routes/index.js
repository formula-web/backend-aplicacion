var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Entrando en home. con req.user:", req.user);
  let usuario='';
  if ( req.user ) usuario=req.user.id;  
  res.render('index', { title: 'Express', usuario:usuario });
});

module.exports = router;
