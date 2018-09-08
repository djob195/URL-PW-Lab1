const express =   require('express');
let app = express();
let Receta = require('../../models/receta');


// ============================
// Crear una nueva receta
// ============================
app.post('/receta', (req, res) => {
    let body = req.body;

    let receta = new Receta({
        nombre: body.nombre,
        descripcion: body.descripcion,
        fechaIngreso: Date.now()
    });
    receta.save()
    .then(recetaDB =>{
        res.json({
            ok: true,
            categoria: recetaDB
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
// actualizar una receta
// ===================================
app.put('/receta/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    body.fechaActualizacion = Date.now();

    Receta.findByIdAndUpdate(id, body,{new: true, runValidators: true})
    .then(recetaDB => {
        res.json({
            ok: true,
            receta: recetaDB
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
// Mostrar todas las recetas
// ============================
app.get('/receta', (req, res) => {
    let desde = req.query.start || process.env.DESDE ;
    desde = Number(desde);

    let  limite = req.query.length  || process.env.LIMITE;
    limite = Number(limite);

    let regex = new RegExp(req.query.search.value, 'i');
    let condicion = {estado:true, nombre:regex};

    let p1 = Receta.find(condicion, 'nombre descripcion')
    .sort('nombre')
    .limit(limite)
    .skip(desde)
    .exec();

    let p2 = Receta.count(condicion);

    let p3 = Receta.count({estado:true});
    
    Promise.all([p1,p2,p3])
    .then(values =>{
        res.json({
            ok: true,
            dataTable: {
                draw = req.query.draw,
                recordsTotal = values[2],
                recordsFiltered = values[1],
                data = values[0]
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
// Mostrar una receta por ID
// ============================
app.get('/receta/:id',(req, res) => {
    let id = req.params.id;
    Receta.findById(id)
    .then(recetaDB =>{
        res.json({
            ok: true,
            receta: recetaDB
        });
    }).catch(err =>{
        return res.status(400).json({
            ok: false,
            err
        });
    });
});

// ============================
// Eliminar una receta
// ============================
app.delete('/receta/:id', (req, res) => {
    let id =  req.params.id;
    let body = {estado:false};
    Receta.findByIdAndUpdate(id, body,{new: true})
    .then(recetaBorrado => {
        if (recetaBorrado === null){
            return res.status(404).json({
                ok: false,
                err:  {message:"receta no encontrado"}
            });
        }
        res.json({
            ok: true,
            receta: recetaBorrado
        });
    }).catch(err => {
        return res.status(400).json({
            ok: false,
            err
        });
    });
});