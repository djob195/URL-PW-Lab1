import React from 'react';
import { Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import {getAlimento} from '../../../config/Alimento/ls_alimento';

class Update extends React.Component{ 
    
constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      alimento: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

componentDidMount() {
  const { match: { params } } = this.props;
  this.getIngrediente(params.id);
}

getIngrediente(id)
{
  let toFetch = global.fakeFetch; 
  fetch(toFetch)
  .then(response => {
    return getAlimento(id);
  })
  .then(json => {
    if(json.ok){
      this.setState({isLoaded:true, alimento: json.alimento});
    }
    else
    {
       this.setState({isLoaded:true, error: "Error al obtener el alimento"});
    }
  })
  .catch(err =>{
    this.setState({isLoaded:true, error: err});
  });
}

handleSubmit(event) {
    this.setState({isLoaded:false});
    event.preventDefault();
    var data =  JSON.stringify({
        nombre: document.getElementById('nombre').value,
        descripcion: document.getElementById('descripcion').value
    });
    fetch(global.restApi+ "/ingrediente", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
      body: data,
    })
    .then(response => {
        return response.json();
    })
    .then(json => {
        if(json.ok){
            this.props.history.push('/alimento/index');
        }
        else
        {
        this.setState({isLoaded:false, error: "Error al obtener el total en el REST"});
        }
    })
    .catch(err =>{
        this.setState({
            isLoaded: false,
            error: err
        });
    });
  }

    render() {
        const { error, isLoaded, alimento} = this.state;
        if (error) {
        return <div>Error: {error.message}</div>;
        }else if (!isLoaded) {
        return <div>Loading...</div>;
        }
        return (
        <div>
        <h1>Editar el alimento con el identificador: {alimento._id}</h1>
            <Form id="formularioAlimento">
            <FormGroup row>
            <Label for="nombre" sm={2} size="lg">Nombre</Label>
            <Col sm={10}>
                <Input type="text" name="nombre" id="nombre" placeholder="nombre" defaultValue={alimento.nombre} bsSize="lg" />
            </Col>
            </FormGroup>
            <FormGroup row>
            <Label for="descripcion" sm={2}>Descripción</Label>
            <Col sm={10}>
                <Input type="textarea" name="descripcion" id="descripcion" defaultValue={alimento.descripcion} placeholder="descripción" />
            </Col>
            </FormGroup>
            <FormGroup row>
            <Label for="fechaIngreso" sm={2}>Fecha de Ingreso</Label>
            <Col sm={10}>
                <Input type="date" name="fechaIngreso" id="fechaIngreso" defaultValue={alimento.fechaIngreso} />
            </Col>
            </FormGroup>
            <FormGroup row>
            <Label for="image" sm={2}>Imagen</Label>
            <Col sm={10}>
                <img src={alimento.image} alt=""/>
            </Col>
            </FormGroup>
            <Button  onClick={this.handleSubmit}>Editar</Button>
        </Form>
        </div>
        );
    }
}
export default withRouter(Update);