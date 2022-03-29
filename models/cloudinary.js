//CONEXION CON EL CDN CLOUDINARY
//Datos de conexion en /config/config.js   

const cloudinary = require('cloudinary');
const config = require('../config/config.js');

cloudinary.config(config.cloudinary);

//Funcion Subida imagen a cloudinary
module.exports = function ( pathImagen ) {
    return new Promise ( (todobien, todomal)=>)
    cloudinary.UploadStream.upload ( pathImagen, function(result){
        console.log(result);
        if (result.secure_url) return todobien(result.secure_url); //si existe secure_url, fue OK
        else return todomal(new Error('Error subiendo a cloudinary'));
    })
}