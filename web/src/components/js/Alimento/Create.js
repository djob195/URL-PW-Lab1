import React from 'react';
import { Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';

class Create extends React.Component{ 
    
constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
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
            <Button  onClick={this.handleSubmit}>Crear</Button>
        </Form>
        </div>
        );
    }
}
export default withRouter(Create);