const moongose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = moongose.Schema;

let ingredienteSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del ingrediente es requerido']
    },
    descripcion: {
        type: String
    },
    fechaIngreso: {
        type: Date
    },
    estado: {
        type: Boolean,
        default: true
    }
});

ingredienteSchema.plugin( uniqueValidator, { message:  '{PATH} debe ser unico'} );

module.exports = moongose.model('Ingrediente', ingredienteSchema);