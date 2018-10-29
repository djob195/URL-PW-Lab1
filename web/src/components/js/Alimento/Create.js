import React from 'react';
import { Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import uuidv1 from 'uuid/v1';
import {insertAlimento} from '../../../config/Alimento/ls_alimento';

class Create extends React.Component{ 
    
constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBackIndex = this.handleBackIndex.bind(this);
  }

handleSubmit(event) {
    this.setState({isLoaded:false});
    event.preventDefault();
    var data =  JSON.stringify({
        _id: uuidv1(),
        nombre: document.getElementById('nombre').value,
        descripcion: document.getElementById('descripcion').value,
        image: "http://localhost:3000/img/frutas2.jpg",
        fechaIngreso: Date.now()
    });
    //let toFetch = global.fakeFetch; 
    fetch(global.restApi+ "ingrediente", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
      body: data,
    })
    //fetch(toFetch)
    .then(response => {
        /*let json = insertAlimento(JSON.parse(data));
        return json;*/
        return response.json();
    })
    .then(json => {
        if(json.ok){
            this.props.history.push('/alimento/index');
        }
        else
        {
        this.setState({isLoaded:true, error: "Error al obtener el total en el REST"});
        }
    })
    .catch(err =>{
        this.setState({
            isLoaded: true,
            error: err
        });
    });
  }

  handleBackIndex(event) {
    this.props.history.push('/alimento/index');
  }



    render() {
        const { error, isLoaded} = this.state;
        if (error) {
        return <div>Error: {error.message}</div>;
        }else if (!isLoaded) {
        return <div>Loading...</div>;
        }
        return (
        <div>
        <h1>Crear un nuevo alimento</h1>
            <Form id="formularioAlimento">
            <FormGroup row>
            <Label for="nombre" sm={2} size="lg">Nombre</Label>
            <Col sm={10}>
                <Input type="text" name="nombre" id="nombre" placeholder="nombre" bsSize="lg" />
            </Col>
            </FormGroup>
            <FormGroup row>
            <Label for="descripcion" sm={2}>Descripción</Label>
            <Col sm={10}>
                <Input type="textarea" name="descripcion" id="descripcion" placeholder="descripción" />
            </Col>
            </FormGroup>
            <FormGroup row>
            <Label for="fechaIngreso" sm={2}>Fecha de Ingreso</Label>
            <Col sm={10}>
                <Input type="date" name="fechaIngreso" id="fechaIngreso"/>
            </Col>
            </FormGroup>
             <FormGroup row>
            <Label for="image" sm={2}>Seleccione la imagen</Label>
            <Col sm={10}>
                <Input type="file" name="image" id="image" />
            </Col>
            </FormGroup>
            <FormGroup row>
            <Col sm={6}>
                <Button  onClick={this.handleSubmit}>Crear</Button>
            </Col>
            <Col sm={6}>
                <Button  onClick={this.handleBackIndex}>Regresar</Button>
            </Col>
            </FormGroup>
        </Form>
        </div>
        );
    }
}
export default withRouter(Create);