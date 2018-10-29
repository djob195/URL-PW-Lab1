const { getIngredientes } = require('../services/ingrediente.service');
const { localizationTime } = require ('../utils');
const dateFormat = require('dateformat');

const cronUpdateIngredientes = (clientRedis) =>{
    dateFormat.i18n = localizationTime();
    cron.schedule('*/2 * * * *', () => {
        try {
            data = getIngredientes();
            if(data.ok === true){
                data.dataTable.data.forEach(element => {
                    clientRedis.hmset(element._id, [
                        "nombre",element.nombre,
                        "descripcion". element.descripcion  || "sin descripcion",
                        "fechaIngreso", dateFormat(element.fechaIngreso, "dd/mm/aaaa"),
                        "fechaActualizacion", dateFormat(element.fechaActualizacion, "dd/mm/aaaa"),
                        "estado",element.estado.toString()
                        ],
                    (err, reply) =>{
                        if(err){
                            console.log(err);
                        }
                        client.sadd("hingredientes",[element._id],(err,reply)=>{
                            if(err){
                                console.log(err);
                            }                          
                        });
                    });
                });
            }
            else{
                console.log(data.err);   
            }
        } catch (error) {
            console.log(error);   
        }
      });
}

module.exports = {cronUpdateIngredientes};