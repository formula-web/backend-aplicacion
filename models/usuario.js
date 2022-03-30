// MODELO USUARIO en MongoDB / Libreria Mongoose
const mongoose=require('mongoose');
const mongoosepaginate=require('mongoose-paginate'); //plugin de paginacion se añade al esquema
const bcrypt = require('mongoose-bcrypt');

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


//Añadir un plugin al esquema. El plugin aporta método paginate() al modelo Tienda
usuarioSchema.plugin(mongoosepaginate);  //añade método paginate() similar a find, paginado
usuarioSchema.plugin(bcrypt);//passwords

let Usuario = mongoose.model ('Usuario', usuarioSchema); 
module.exports = Usuario;