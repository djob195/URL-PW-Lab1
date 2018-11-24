const moongose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = moongose.Schema;

let ingredienteSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del ingrediente es requerido']
    },
    descripcion: {
        type: String,
        default: 'sin descripcion'
    },
    calorias: {
        type: Number,
         required: [true, 'El numero de calorias es requerido']
    },
    diaDeVida: {
        type: Number,
        required: [true, 'El tiempo de vida es requerido']
    },
    Origen: {
        type: String,
        default: 'sin origen'
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