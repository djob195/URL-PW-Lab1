const express =   require('express');
let app = express();
let Paso = require('../../models/paso');


// ============================
// Crear una nueva paso
// ============================
app.post('/paso', (req, res) => {
    let body = req.body;

    let paso = new Paso({
        descripcion: body.descripcion,
        orden: body.orden,
        fechaIngreso: Date.now(),

        receta: body.recetaID
    });
    paso.save()
    .then(pasoDB =>{
        res.json({
            ok: true,
            categoria: pasoDB
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
// actualizar una paso
// ===================================
app.put('/paso/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    body.fechaActualizacion = Date.now();

    Paso.findByIdAndUpdate(id, body,{new: true, runValidators: true})
    .then(pasoDB => {
        res.json({
            ok: true,
            paso: pasoDB
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
// Mostrar todas las pasos por receta
// ============================
app.get('/paso', (req, res) => {
    let desde = req.query.start || process.env.DESDE ;
    desde = Number(desde);

    let  limite = req.query.length  || process.env.LIMITE;
    limite = Number(limite);

    let condicion = {estado:true, receta:req.query.receta};

    let p1 = Paso.find(condicion, 'orden descripcion')
    .sort('orden')
    .limit(limite)
    .skip(desde)
    .exec();

    let p2 = paso.count(condicion);

    let p3 = paso.count({estado:true});
    
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
// Mostrar una paso por ID
// ============================
app.get('/paso/:id',(req, res) => {
    let id = req.params.id;
    Paso.findById(id)
    .then(pasoDB =>{
        res.json({
            ok: true,
            paso: pasoDB
        });
    }).catch(err =>{
        return res.status(400).json({
            ok: false,
            err
        });
    });
});

// ============================
// Eliminar una paso
// ============================
app.delete('/paso/:id', (req, res) => {
    let id =  req.params.id;
    let body = {estado:false};
    Paso.findByIdAndUpdate(id, body,{new: true})
    .then(pasoBorrado => {
        if (pasoBorrado === null){
            return res.status(404).json({
                ok: false,
                err:  {message:"paso no encontrado"}
            });
        }
        res.json({
            ok: true,
            paso: pasoBorrado
        });
    }).catch(err => {
        return res.status(400).json({
            ok: false,
            err
        });
    });
});

module.exports = app;