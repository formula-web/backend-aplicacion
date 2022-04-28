//MODELO APLICACION (En MongoDB): aplicacion cliente con ciertos permisos para accedor a los servicios REST
// aplicacionId:  string unico calculado aleatoriamente con la libreria "randomstring"
// secreto:  clave unica para identificar a la aplicacion. Calculado.
// dominios: dominios desde los que se permitirá el acceso a la aplicacion a los servicios REST.
// nombre:   Nombre de la aplicacion

const mongoose = require('mongoose');
const randomstring = require('randomstring');

//funcion para generar strings unicos usando 'ramdonstring' y utilizable como middlewara en un hook (argumento next)
// Uso: asignar valores automaticamente a los campos "aplicacionId" y "secreto"
// Llamada: en el hook anterior a la validacion de moongose: .pre('validate')
function asignarValorUnicoACampo ( aplicacion, campo, next){
    const randomString = randomstring.generate(20);  //string de 20 posiciones
    //Asegurar que el string generado no se exista ya en otra aplicacion. Y si existe volver a generarlo llamandose 
    // la funcion de forma recursiva
    let campoValor = {};
    campoValor[campo] = randomstring.generate(20);
    Aplicacion.count( campoValor )
    .then (cuantos=>{
        if (cuantos>0) return asignarValorUnicoACampo(aplicacion,campo,next);
        aplicacion[campo]=campoValor[campo];
        console.log("asignarValorUnicoACampo():",campo,aplicacion[campo]);
        next();
    })
}



let aplicacionSchema = new mongoose.Schema({
    aplicacionId:  {
        type: String,
        required: true,
        unique: true
    },
    secreto: {
        type: String,
        required: true,
        unique: true
    },
    dominios: String,
    nombre: String
})


// en hook antes de validacion, asignar strings unicos random a los campos aplicacionId y secreto
aplicacionSchema.pre('validate', function(next){
    asignarValorUnicoACampo(this, 'aplicacionId',()=>{
        asignarValorUnicoACampo(this, 'secreto', next);
    })
})

const Aplicacion = mongoose.model('Aplicacion', aplicacionSchema);

module.exports = Aplicacion;