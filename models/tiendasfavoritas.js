//Entidad intermedia para Relacion N a N entre usuarios y tiendas
// Un usuario: N tiendas favoritas
// Un tienda: favorita de N usuarios
const mongoose=require('mongoose');

let tiendasfavoritasSchema = new mongoose.Schema({
    _usuario:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    _tienda:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Tienda',
        required: true
    },

});



let tiendasFavoritas = mongoose.model ('TiendasFavoritas', tiendasfavoritasSchema);
module.exports = tiendasFavoritas;