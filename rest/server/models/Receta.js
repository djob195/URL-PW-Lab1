const moongose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = moongose.Schema;

let recetaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la receta es necesario']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion de la receta es necesario']
    },
    fechaIngreso: {
        type: Date
    },
    fechaActualizacion: {
        type: Date
    },
    estado: {
        type: Boolean,
        default: true
    }
});

recetaSchema.plugin( uniqueValidator, { message:  '{PATH} debe ser unico'} );

module.exports = moongose.model('Receta', recetaSchema);