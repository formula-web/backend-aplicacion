// MODELO USUARIO en MongoDB / Libreria Mongoose
const mongoose=require('mongoose');
const mongoosepaginate=require('mongoose-paginate'); //plugin de paginacion se añade al esquema
const bcrypt = require('mongoose-bcrypt');
const Tienda = require('./tienda');
const Favoritas = require('./tiendasfavoritas');

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

//ENTIDAD VIRTUAL PARA BUSQUEDA DE "TIENDAS" RELACIONADAS/PERTENECIENTES A UN USUARIO
usuarioSchema.virtual('usuarioTiendas').get( function(){
    return Tienda.find( {'_usuario': this._id});
})

//ENTIDAD VIRTUAL PARA BUSQUEDA DE "TIENDAS FAVORITAS" DEL USUARIO (ELEMENTOS DE LA ENTIDAD "TIENDASFAVORITAS")
usuarioSchema.virtual('usuarioFavoritas').get( function(){
    return Favoritas.find( {'_usuario': this._id}, { '_tienda': true }); // _tienda:true, especifica que solo coja el campo _tienda
})


//PLUGINS
//Añadir un plugin al esquema. El plugin aporta método paginate() al modelo Tienda
usuarioSchema.plugin(mongoosepaginate);  //añade método paginate() similar a find, paginado
usuarioSchema.plugin(bcrypt);//plugin bcrypt crea y actualiza el campo password encriptado

let Usuario = mongoose.model ('Usuario', usuarioSchema); 
module.exports = Usuario;