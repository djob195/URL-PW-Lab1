const moongose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = moongose.Schema;

let pasoSchema = new Schema({
    descripcion: {
        type: String,
        required: [true, 'La descripción del paso es requerido']
    },
    orden: {
        type: Number,
        required: [true, 'El orden del paso es requerido']
    },
    fechaIngreso: {
        type: Date
    },
    estado: {
        type: Boolean,
        default: true
    },
    fechaActualizacion: {
        type: Date
    },

    Receta: {
        type: Schema.Types.ObjectId,
        ref: 'Receta',
        required: [true, 'Debe estar asociado el paso a una receta']
    },
});

pasoSchema.plugin( uniqueValidator, { message:  '{PATH} debe ser unico'} );

module.exports = moongose.model('Paso', pasoSchema);