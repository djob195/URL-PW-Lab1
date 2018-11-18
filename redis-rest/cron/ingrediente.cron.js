const { getIngredientes } = include('services/ingrediente.service');
const { localizationTime } = include('utils');
const dateFormat = require('dateformat');
const cron = require('node-cron');

const cronUpdateIngredientes = (clientRedis) =>{
    dateFormat.i18n = localizationTime();
    cron.schedule('*/1 * * * *', () => {
        try {
            getIngredientes()
            .then(data => {
                if(data.ok === true){
                    data.dataTable.data.forEach(element => {
                        clientRedis.hmset(element._id, [
                            "nombre",element.nombre,
                            "descripcion", element.descripcion  || "sin descripcion",
                            "fechaIngreso", dateFormat(element.fechaIngreso, "mm/dd/yyyy"),
                            "fechaActualizacion", dateFormat(element.fechaActualizacion, "mm/dd/yyyy"),
                            "estado",element.estado.toString()
                            ],
                        (err, reply) =>{
                            if(err){
                                console.log(err);
                            }
                            clientRedis.sadd("hingredientes",[element._id],(err,reply)=>{
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
            });
        } catch (error) {
            console.log(error);   
        }
      });
}

module.exports = {cronUpdateIngredientes};