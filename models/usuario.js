// MODELO USUARIO en MongoDB / Libreria Mongoose
const mongoose=require('mongoose');
const mongoosepaginate=require('mongoose-paginate'); //plugin de paginacion se añade al esquema
const bcrypt = require('mongoose-bcrypt');
const Tienda = require('./tienda');

let usuarioSchema = new mongoose.Schema({
    email: {
        type: String,
        required:true,
        unique:true

    },
    nombre: String,
    admin: {
        type: Boolean,
        default: false
    },

})

//ENTIDAD VIRTUAL PARA BUSQUEDA DE "TIENDAS" RELACIONADAS CON UN USUARIO
usuarioSchema.virtual('usuarioTiendas').get( function(){
    return Tienda.find( {'_usuario': this._id});
})

//PLUGINS
//Añadir un plugin al esquema. El plugin aporta método paginate() al modelo Tienda
usuarioSchema.plugin(mongoosepaginate);  //añade método paginate() similar a find, paginado
usuarioSchema.plugin(bcrypt);//plugin bcrypt crea y actualiza el campo password encriptado

let Usuario = mongoose.model ('Usuario', usuarioSchema); 
module.exports = Usuario;