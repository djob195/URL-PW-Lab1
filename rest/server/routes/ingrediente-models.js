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
    fechaActualizacion: {
        type: Date
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = moongose.model('Ingrediente', ingredienteSchema);