//Exporta objeto MULTER que realiza subidas de archivos al directorio "dest"

const multer=require('multer');

module.exports = multer ( {dest: 'uploads/'}); //carpeta uploads es local, no del cdn

