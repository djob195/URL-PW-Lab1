import React from 'react';
import { Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import {getAlimento, updateAlimento} from '../../../config/Alimento/ls_alimento';

class Update extends React.Component{ 
    
constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      alimento: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBackIndex = this.handleBackIndex.bind(this);
  }

componentDidMount() {
  const { match: { params } } = this.props;
  this.getIngrediente(params.id);
}

getIngrediente(id)
{
  let toFetch = global.restApi+ "ingrediente/" + id; 
  fetch(toFetch)
  .then(response => {
    return response.json();
  })
  .then(json => {
    if(json.ok){
        console.log(json);
      this.setState({isLoaded:true, alimento: json.ingrediente});
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
    const { match: { params } } = this.props;
    this.setState({isLoaded:false});
    event.preventDefault();
    var data =  JSON.stringify({
        _id: params.id,
        nombre: document.getElementById('nombre').value,
        descripcion: document.getElementById('descripcion').value,
        calorias: document.getElementById('calorias').value,
        diaDeVida: document.getElementById('diaDeVida').value,
        Origen: document.getElementById('origen').value
    });
    console.log(data);
    //let toFetch = global.fakeFetch; 
    fetch(global.restApi+ "ingrediente/" + params.id , {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
      body: data,
    })
    //fetch(toFetch)
    .then(response => {
        /*let json = updateAlimento(JSON.parse(data));
        return json;*/
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

  handleBackIndex(event) {
    this.props.history.push('/alimento/index');
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
        <h1>Editar el alimento</h1>
            <Form id="formularioAlimento">
            <FormGroup row>
            <Label for="nombre" sm={2} size="lg">Nombre</Label>
            <Col sm={8}>
                <Input type="text" name="nombre" id="nombre" placeholder="nombre" defaultValue={alimento.nombre} bsSize="lg" />
            </Col>
            </FormGroup>
            <FormGroup row>
            <Label for="descripcion" sm={2}>Descripción</Label>
            <Col sm={8}>
                <Input type="textarea" name="descripcion" id="descripcion" defaultValue={alimento.descripcion} placeholder="descripción" />
            </Col>
            </FormGroup>
            <FormGroup row>
            <Label for="calorias" sm={2}>* Calorias</Label>
            <Col sm={8}>
                <Input type="number" name="calorias" id="calorias" min="0" defaultValue={alimento.calorias} required  />
            </Col>
            </FormGroup>
            <FormGroup row>
            <Label for="diaDeVida" sm={2}>* Dias de vida del alimento</Label>
            <Col sm={8}>
                <Input type="number" name="diaDeVida" id="diaDeVida" min="0" defaultValue={alimento.diaDeVida} required  />
            </Col>
            </FormGroup>
            <FormGroup row>
            <Label for="origen" sm={2}>Origen de alimento (De donde proviene)</Label>
            <Col sm={8}>
                <Input type="textarea" name="origen" id="origen" defaultValue={alimento.Origen}  />
            </Col>
            </FormGroup>
            <FormGroup row>
            <Col sm={{ size: 'auto', offset: 1 }}>
                <Button  onClick={this.handleBackIndex}>Regresar</Button>
            </Col>
            <Col sm={{ size: 'auto', offset: 1 }}>
                <Button  onClick={this.handleSubmit}>Editar</Button>
            </Col>
            </FormGroup>
        </Form>
        </div>
        );
    }
}
export default withRouter(Update);