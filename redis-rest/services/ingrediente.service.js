const fetch = require('node-fetch');

const getIngredientes =  async () =>{
    let path = `${process.env.REST_API}ingrediente?start=-1&length=-1`;
    const response = await fetch(path, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
    });
    const json = await response.json();
    console.log(json);
    return json;
}


const deleteIngrediente = async (id) =>{   
    const response = await fetch(`${process.env.REST_API}ingrediente/${id}`, {
    method: 'DELETE',
    });
    const json = await response.json();
    return json;
}

const updateIngrediente = async (id,body) =>{   
    const response = await fetch(`${process.env.REST_API}ingrediente/${id}`, {
        method: 'PUT', 
        body: JSON.stringify(body),
        headers:{
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();
      return json;
}

const InsertIngrediente = async (body) =>{   
    const response = await fetch(`${process.env.REST_API}ingrediente`, {
        method: 'POST', 
        body: JSON.stringify(body),
        headers:{
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();
      return json;
}
module.exports = {getIngredientes, deleteIngrediente, updateIngrediente, InsertIngrediente};