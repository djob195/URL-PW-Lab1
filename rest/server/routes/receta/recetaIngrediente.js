const express =   require('express');
let app = express();
let RecetaIngrediente = require('../../models/recetaIngrediente');


// ============================
// Crear una nueva recetaIngrediente
// ============================
app.post('/recetaIngrediente', (req, res) => {
    let body = req.body;

    let recetaIngrediente = new RecetaIngrediente({
        cantidad: body.cantidad,
        receta: body.recetaID,
        ingrediente: body.ingredienteID
    });
    recetaIngrediente.save()
    .then(recetaIngredienteDB =>{
        res.json({
            ok: true,
            recetaIngrediente: recetaIngredienteDB
        });
    })
    .catch(err => {
        return res.status(400).json({
            ok: false,
            err
        });
    });
});

// ===================================
// actualizar una recetaIngrediente
// ===================================
app.put('/recetaIngrediente/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    body.fechaActualizacion = Date.now();

    RecetaIngrediente.findByIdAndUpdate(id, body,{new: true, runValidators: true})
    .then(recetaIngredienteDB => {
        res.json({
            ok: true,
            recetaIngrediente: recetaIngredienteDB
        });
    })
    .catch(err =>{
          return res.status(400).json({
              ok: false,
              err
          });
    });
});


// ============================
// Mostrar todas las recetaIngredientes por receta
// ============================
app.get('/recetaIngrediente', (req, res) => {
    let desde = req.query.start || process.env.DESDE ;
    desde = Number(desde);

    let  limite = req.query.length  || process.env.LIMITE;
    limite = Number(limite);

    let condicion = {estado:true, receta:req.query.receta};

    let p1 = RecetaIngrediente.find(condicion, 'cantidad')
    .populate('ingrediente')
    .sort('fechaIngreso')
    .limit(limite)
    .skip(desde)
    .exec();

    let p2 = RecetaIngrediente.count(condicion);

    let p3 = RecetaIngrediente.count({estado:true});
    
    Promise.all([p1,p2,p3])
    .then(values =>{
        res.json({
            ok: true,
            dataTable: {
                draw : req.query.draw,
                recordsTotal : values[2],
                recordsFiltered : values[1],
                data : values[0]
             }
        });
    }).catch(err =>{
        return res.status(400).json({
            ok: false,
            err
        });
    });
});

// ============================
// Mostrar una recetaIngrediente por ID
// ============================
app.get('/recetaIngrediente/:id',(req, res) => {
    let id = req.params.id;
    RecetaIngrediente.findById(id)
    .then(recetaIngredienteDB =>{
        res.json({
            ok: true,
            recetaIngrediente: recetaIngredienteDB
        });
    }).catch(err =>{
        return res.status(400).json({
            ok: false,
            err
        });
    });
});

// ============================
// Eliminar una recetaIngrediente
// ============================
app.delete('/recetaIngrediente/:id', (req, res) => {
    let id =  req.params.id;
    let body = {estado:false};
    RecetaIngrediente.findByIdAndUpdate(id, body,{new: true})
    .then(recetaIngredienteBorrado => {
        if (recetaIngredienteBorrado === null){
            return res.status(404).json({
                ok: false,
                err:  {message:"recetaIngrediente no encontrado"}
            });
        }
        res.json({
            ok: true,
            recetaIngrediente: recetaIngredienteBorrado
        });
    }).catch(err => {
        return res.status(400).json({
            ok: false,
            err
        });
    });
});

module.exports = app;