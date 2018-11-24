global.base_dir = __dirname;
global.abs_path = function(path) {
  return base_dir + path;
}
global.include = function(file) {
  return require(abs_path('/' + file));
}

const express = require('express');
const bodyParser = require("body-parser");
const methodOverride = require('method-override');
const redis = require('redis');
const {cronUpdateIngredientes} = require('./cron/ingrediente.cron');
const {deleteIngrediente, updateIngrediente, InsertIngrediente} = require('./services/ingrediente.service');
const dateFormat = require('dateformat');

require('./config/index.js');


let client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

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

app.get('/',(req, res) => {
    res.json({
        ok: true,
        message: "hello word"
    });
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
                _id: id,
                nombre: obj.nombre,
                descripcion: obj.descripcion,
                fechaIngreso: obj.fechaIngreso,
                fechaActualizacion: obj.fechaActualizacion,
                calorias: obj.calorias,
                diaDeVida: obj.diaDeVida,
                Origen: obj.Origen
            }
            console.log(ingrediente);
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
        if(objects.length === 0)
        {
            return res.json({
                ok: true,
                dataTable: {
                    draw : Number(req.query.draw),
                    recordsTotal: 0,
                    recordsFiltered: 0,
                    data : []
                 }
            });
        }
        let data = [];
        for (let index = 0; index < objects.length; index++) {
            const element = objects[index];
            client.hgetall(element,(err, obj) =>{
                console.log(index);
                if(err){
                    console.log(err);
                    return res.json(err); 
                }
                else{
                    let ingrediente = {
                        _id: element,
                        nombre: obj.nombre,
                        descripcion: obj.descripcion,
                        fechaIngreso: obj.fechaIngreso,
                        fechaActualizacion: obj.fechaActualizacion,
                        estado: obj.estado,
                        calorias: obj.calorias,
                        diaDeVida: obj.diaDeVida,
                        Origen: obj.Origen
                    }
                    data.push(ingrediente);
                    if(index === objects.length-1)
                    {
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
                        console.log(data);
                        res.json({
                            ok: true,
                            dataTable: {
                                draw : Number(req.query.draw),
                                recordsTotal,
                                recordsFiltered,
                                data : data
                             }
                        });
                    }
                }
            })
        }
    })
});

app.delete('/ingrediente/:id',(req, res) => {
    let id = req.params.id;
    try {
        deleteIngrediente(id)
        .then(json =>{
            console.log(json);
            if (json.ok === true){
                client.hdel(id,["nombre","descripcion",
                "fechaIngreso","fechaActualizacion","estado","calorias","diaDeVida", "Origen"],(err,obj) =>{
                    if(err){
                        console.log(err);
                        return res.json(err); 
                    }
                    client.srem("hingredientes",[id],(err, del) =>{
                        if(err){
                            console.log(err);
                            return res.json(err); 
                        }
                        res.json(json);
                    })
                })
            }else{
                console.log(json.err);
            }
        });
    } catch (error) {
        console.log(error);   
        return res.json(error); 
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
                    "descripcion", json.ingrediente.descripcion  || "sin descripcion",
                    "fechaIngreso", dateFormat(json.ingrediente.fechaIngreso, "mm/dd/yyyy") || "Sin fecha de ingreso",
                    "fechaActualizacion", dateFormat(json.ingrediente.fechaActualizacion, "mm/dd/yyyy") || "Sin fecha de actualizacion",
                    "estado",json.ingrediente.estado,
                    "calorias",json.ingrediente.calorias,
                    "diaDeVida",json.ingrediente.diaDeVida,
                    "Origen",json.ingrediente.Origen
                    ],
                (err, reply) =>{
                    if(err){
                        console.log(err);
                        return res.json(err);  
                    }
                    client.sadd("hingredientes",[json.ingrediente._id],(err,reply)=>{
                        if(err){
                            console.log(err);
                            return res.json(err);  
                        }     
                        res.json(json);                     
                    });
                });
            } else {
                console.log(json.err);
                res.json(json);  
            }
        })
    } catch (error) {
        console.log(error);   
        res.json(error);  
    }
});

app.put('/ingrediente/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;
    console.log("entro a modificar");
    try {
        updateIngrediente(id,body)
        .then(json =>{
            if(json.ok === true) {
                console.log(json.ingrediente);
                client.hmset(json.ingrediente._id, [
                    "nombre",json.ingrediente.nombre,
                    "descripcion", json.ingrediente.descripcion  || "sin descripcion",
                    "fechaIngreso", dateFormat(json.ingrediente.fechaIngreso, "mm/dd/yyyy") || "Sin fecha de ingreso",
                    "fechaActualizacion", dateFormat(json.ingrediente.fechaActualizacion, "mm/dd/yyyy") || "Sin fecha de actualizacion",
                    "estado",json.ingrediente.toString(),
                    "calorias",json.ingrediente.calorias,
                    "diaDeVida",json.ingrediente.diaDeVida,
                    "Origen",json.ingrediente.Origen
                    ],
                (err, reply) =>{
                    if(err){
                        console.log(err);
                        return  res.json(err);
                    }
                    res.json(json);
                });
            }else{
                console.log(json.err);
                res.json(json);
            }
        });
    } catch (error) {
        res.json(error);
        console.log(error);   
    }
});
cronUpdateIngredientes(client);

 