//Exporta un objeto de conexion a MongoDB, a través de mongoose
const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // No usar las promise de mongoose ?
//mongoose.set('bufferCommands', false);

module.exports = {
    connect: ( uri, dbname )=>{
        let conexion=
        mongoose.connect(uri+dbname,{useMongoClient: true});
        //conexion.then(()=>{ console.log("Conexion ok")})
        //.catch(error=>{console.log("Error al conectar:",error)});
        //mongoose.connect('mongodb://localhost/'+dbName,{useMongoClient: true});
        this.dbName=dbname;
        return conexion;
    },
    dbName: '',
    connection: ()=>{
        if(mongoose.connection) return mongoose.connection;
        return this.connect();
    }
}