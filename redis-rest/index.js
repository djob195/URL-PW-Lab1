const express = require('express');
const bodyParser = require("body-parser");
const methodOverride = require('method-override');
const redis = require('redis');
const {cronUpdateIngredientes} = require('./cron/ingrediente.cron');
const {deleteIngrediente, updateIngrediente, InsertIngrediente} = require('./services/ingrediente.service');
require('./config/index.js');


let client = redis.createClient();

client.on('connect', ()=>{
    console.log("connected to redis");
})

const app = express();

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  next();
});
app.use(methodOverride('_method'));

app.use(bodyParser.json());

app.listen(process.env.PORT, () =>{
    console.log(`server stated on port ${process.env.PORT}`);
});

app.get('/ingrediente/:id',(req, res) => {
    let id = req.params.id;
    client.hgetall(id,(err, obj) =>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        else{
            let ingrediente = {
                _id: obj._id,
                nombre: obj.alimento,
                descripcion: obj.descripcion,
                fechaIngreso: obj.fechaIngreso,
                fechaActualizacion: obj.fechaActualizacion,
                estado: obj.estado
            }
            res.json({
                ok: true,
                ingrediente
            });
        }
    })
});

app.get('/ingrediente',(req, res) => {
    let desde = req.query.start || process.env.DESDE ;
    desde = Number(desde);

    let  limite = req.query.length  || process.env.LIMITE;
    limite = Number(limite);

    client.smembers("hingredientes",(err, objects) =>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        let data = [];
        for (let index = 0; index < objects.length; index++) {
            const element = objects[index];
            client.hgetall(element,(err, obj) =>{
                if(err){
                    console.log(err);
                }
                else{
                    let ingrediente = {
                        _id: obj._id,
                        nombre: obj.alimento,
                        descripcion: obj.descripcion,
                        fechaIngreso: obj.fechaIngreso,
                        fechaActualizacion: obj.fechaActualizacion,
                        estado: obj.estado
                    }
                    data.push(ingrediente);
                }
            })
        }
        let  recordsTotal =  data.length;
        let  recordsFiltered = data.length;
        data.sort(function(a, b) {
            if (a.nombre > b.nombre) {
              return 1;
            }
            if (a.nombre < b.nombre) {
              return -1;
            }
            return 0;
          });
        data = data.slice(desde, desde + limite);
        res.json({
            ok: true,
            dataTable: {
                draw : Number(req.query.draw),
                recordsTotal,
                recordsFiltered,
                data : values[0]
             }
        });
    })
});

app.delete('/ingrediente/:id',(req, res) => {
    let id = req.params.id;
    try {
        deleteIngrediente(id)
        .then(json =>{
            if (json.ok === true){
                client.hdel(id,(err,obj) =>{
                    if(err){
                        console.log(err);
                    }
                    res.json({
                        ok: true,
                        ingrediente: json
                    });
                })
            }else{
                console.log(json.err);
            }
        });
    } catch (error) {
        console.log(error);   
    }
});

app.post('/ingrediente', (req, res) => {
    let body = req.body;
    try {
        InsertIngrediente(body)
        .then(json =>{
            if(json.ok === true) {
                client.hmset(json.ingrediente._id, [
                    "nombre",json.ingrediente.nombre,
                    "descripcion". json.ingrediente.descripcion  || "sin descripcion",
                    "fechaIngreso", dateFormat(json.ingrediente.fechaIngreso, "dd/mm/aaaa") || "Sin fecha de ingreso",
                    "fechaActualizacion", dateFormat(json.ingrediente.fechaActualizacion, "dd/mm/aaaa") || "Sin fecha de actualizacion",
                    "estado",element.estado.toString()
                    ],
                (err, reply) =>{
                    if(err){
                        console.log(err);
                    }
                    client.sadd("hingredientes",[json.ingrediente._id],(err,reply)=>{
                        if(err){
                            console.log(err);
                        }     
                        res.json({
                            ok: true,
                            ingrediente: json
                        });                     
                    });
                });
            } else {
                console.log(json.err);
            }
        })
    } catch (error) {
        console.log(error);   
    }
});

app.put('/ingrediente/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;
    try {
        updateIngrediente(id,body)
        .then(json =>{
            if(json.ok === true) {
                client.hmset(json.ingrediente._id, [
                    "nombre",json.ingrediente.nombre,
                    "descripcion". json.ingrediente.descripcion  || "sin descripcion",
                    "fechaIngreso", dateFormat(json.ingrediente.fechaIngreso, "dd/mm/aaaa") || "Sin fecha de ingreso",
                    "fechaActualizacion", dateFormat(json.ingrediente.fechaActualizacion, "dd/mm/aaaa") || "Sin fecha de actualizacion",
                    "estado",element.estado.toString()
                    ],
                (err, reply) =>{
                    if(err){
                        console.log(err);
                    }
                    res.json({
                        ok: true,
                        ingrediente: json
                    });
                });
            }else{
                console.log(json.err);
            }
        });
    } catch (error) {
        console.log(error);   
    }
});
cronUpdateIngredientes(client);

 