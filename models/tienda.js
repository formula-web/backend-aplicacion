const mongoose=require('mongoose');
const mongoosepaginate=require('mongoose-paginate'); //plugin de paginacion se añade al esquema
const slugify = require('../plugins/slugify');

let tiendaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required:true
    },
    descripcion: String,
    slug: String,
    aceptaCreditCard: {
        type: Boolean,
        default: false
    },
    imagenPortada: String,
    imagenAvatar: String,
    openHour: Number,
    closeHour: Number,
    // eL campo _usuario es solo un id, del documento usuario, que se define así
    _usuario:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

});
// Añadir un método al Schema
tiendaSchema.methods.fmtest = function() {
    console.log("Ejecutando metodo fmtest de Tienda");
}
// Añadir un método al Schema (otra forma?)  de codigofacilito)
tiendaSchema.statics.contarSlugs=function( titulo ) {
    return Tienda.count( { titulo })
    .then( (cuenta)=>{ return cuenta} );
}


//Usar el hook save para crear y guardar el slug del documento tienda
tiendaSchema.pre('save', async function(next) {
    let cuenta=0;
    console.log("Entra en hook save"); 
    this.slug = slugify(this.titulo);
    console.log(this.titulo, this.slug); 
    //cambiar nombre slug si repetido, añadiendo un contador al final del nombre
    Tienda.contarSlugs(this.titulo)
    .then ((c)=>{
        cuenta = c; console.log("Slug:", this.slug, " Repeticiones titulo:", cuenta);
        if ( cuenta ) {
            this.slug +="_"+cuenta;
            console.log("nuevo slug=", this.slug)
        }
        next();
    });
    

})

//Añadir un plugin al esquema. El plugin aporta método paginate() al modelo Tienda
tiendaSchema.plugin(mongoosepaginate);  //añade método paginate() similar a find, paginado


let Tienda = mongoose.model ('Tienda', tiendaSchema);
module.exports = Tienda;