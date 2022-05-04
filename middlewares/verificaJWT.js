const expressjwt = require('express-jwt');
const config = require('../config/config.js');

module.exports=function(req,res,next) {
    console.log("expressjwt()...");
     var error=expressjwt( { secret: config.jwtSecret, algorithms: ['HS256']  }); 
     console.log("expressjwt()...res:",error);
     next();
}
