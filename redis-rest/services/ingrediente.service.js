const fetch = require('node-fetch');
const url = require('url');

let service = process.env.REST_API  + "/ingrediente";

const getIngredientes = () =>{
    const params = new URLSearchParams({
        start: '-1',
        length: '-1'
      });

    fetch(`${service}?${params.toString()}`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
    }).then(response => {
    return response.json();
    });
}


const deleteIngrediente = (id) =>{   
    fetch(`${service}/${id}`, {
    method: 'DELETE',
    }).then(response => {
    return response.json();
    });
}

const updateIngrediente = (id,body) =>{   
    fetch(`${service}/${id}`, {
        method: 'PUT', 
        body: JSON.stringify(body),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(response => {
        return response.json();
     });
}

const InsertIngrediente = (body) =>{   
    fetch(`${service}/${id}`, {
        method: 'POST', 
        body: JSON.stringify(body),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(response => {
        return response.json();
    });
}
module.exports = {getIngredientes, deleteIngrediente, updateIngrediente, InsertIngrediente};