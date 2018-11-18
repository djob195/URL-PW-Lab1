const express =   require('express');
let app = express();
let Ingrediente = require('./ingrediente-models');


// ============================
// Crear una nueva ingrediente
// ============================
app.post('/ingrediente', (req, res) => {
    let body = req.body;
    console.log(body);
    let ingrediente = new Ingrediente({
        nombre: body.nombre,
        descripcion: body.descripcion,
        fechaIngreso: Date.now()
    });
    ingrediente.save()
    .then(ingredienteDB =>{
        console.log(ingredienteDB);
        res.json({
            ok: true,
            ingrediente: ingredienteDB
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
// actualizar una ingrediente
// ===================================
app.put('/ingrediente/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    body.fechaActualizacion = Date.now();

    Ingrediente.findByIdAndUpdate(id, body,{new: true, runValidators: true})
    .then(ingredienteDB => {
        res.json({
            ok: true,
            ingrediente: ingredienteDB
        });
    })
    .catch(err =>{
          return res.status(400).json({
              ok: false,
              err
          });
    });
});

app.get('/ingrediente/total', (req, res) => {
    let condicion = {estado:true};
    Ingrediente.count(condicion)
    .then(total => {
        res.json({
            ok: true,
            total
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
// Mostrar todas las ingredientes
// ============================
app.get('/ingrediente', (req, res) => {
    let desde = req.query.start || process.env.DESDE ;
    desde = Number(desde);

    let  limite = req.query.length  || process.env.LIMITE;
    limite = Number(limite);

    let condicion = {estado:true};

    let p1 = Ingrediente.find(condicion, 'nombre descripcion fechaIngreso fechaActualizacion estado');

    let p2 = Ingrediente.count(condicion);

    let p3 = Ingrediente.count({estado:true});
    
    Promise.all([p1,p2,p3])
    .then(values =>{
        res.json({
            ok: true,
            dataTable: {
                draw : Number(req.query.draw),
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
// Mostrar una ingrediente por ID
// ============================
app.get('/ingrediente/:id',(req, res) => {
    let id = req.params.id;
    Ingrediente.findById(id)
    .then(ingredienteDB =>{
        res.json({
            ok: true,
            ingrediente: ingredienteDB
        });
    }).catch(err =>{
        return res.status(400).json({
            ok: false,
            err
        });
    });
});

// ============================
// Eliminar una ingrediente
// ============================
app.delete('/ingrediente/:id', (req, res) => {
    let id =  req.params.id;
    let body = {estado:false};
    Ingrediente.findByIdAndUpdate(id, body,{new: true})
    .then(ingredienteBorrado => {
        if (ingredienteBorrado === null){
            return res.status(404).json({
                ok: false,
                err:  {message:"ingrediente no encontrado"}
            });
        }
        res.json({
            ok: true,
            ingrediente: ingredienteBorrado
        });
    }).catch(err => {
        return res.status(400).json({
            ok: false,
            err
        });
    });
});

module.exports = app;