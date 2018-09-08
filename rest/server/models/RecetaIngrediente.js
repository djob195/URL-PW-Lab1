const moongose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = moongose.Schema;

let recetaIngredienteSchema = new Schema({
    cantidad: {
        type: Number,
        required: [true, 'La cantidad del ingrediente para la receta es obligatorio']
    },

    Receta: {
        type: Schema.Types.ObjectId,
        ref: 'Receta',
        required: [true, 'Debe estar asociado el ingrediente a una receta']
    },
    Ingrediente: {
        type: Schema.Types.ObjectId,
        ref: 'Ingrediente',
        required: [true, 'Debe estar asociado el ingrediente a una receta']
    },
});

recetaIngredienteSchema.plugin( uniqueValidator, { message:  '{PATH} debe ser unico'} );

module.exports = moongose.model('RecetaIngrediente', recetaIngredienteSchema);