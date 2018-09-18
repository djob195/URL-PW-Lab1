import React from "react";
import Pagination from 'react-reactstrap-pagination';
import { Row, Col ,Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import {getPagineo} from '../../../config/Alimento/ls_alimento';
import {NavLink} from 'react-router-dom'
import '../../css/Alimento/Index.css'
import '../../fonts/icomoon/style.css';

class Index extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      totalItems: 0,
      data: [],
      modal: false,
      draw: 1
    };
    this.toggle = this.toggle.bind(this);
    this.HandlerDeleteRegister = this.HandlerDeleteRegister.bind(this);
    this.getAllIngredientes = this.getAllIngredientes.bind(this);
  }

 toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

componentDidMount() {
  this.getAllIngredientes(1);
}

getAllIngredientes(page)
{
  let start = (page-1) * global.pageSize;
  //let  toFetch = global.restApi + "/ingrediente?start=" + start +"&length=" + global.pageSize + "&draw=" + this.state.draw;
  let toFetch = global.fakeFetch; 
  fetch(toFetch)
  .then(response => {
    //return response.json();
    //return JSON.parse(localStorage.getItem('Alimentos'));
    return getPagineo(start, global.pageSize);
  })
  .then(json => {
    if(json.ok){
      this.setState({isLoaded:true, totalItems: json.dataTable.recordsFiltered, data: json.dataTable.data, draw: page });
    }
    else
    {
       this.setState({isLoaded:true, error: "Error al obtener el total en el REST"});
    }
  })
  .catch(err =>{
    this.setState({isLoaded:true, error: err});
  });
}

HandlerDeleteRegister(id)
{
  this.setState({isLoaded:false});
  let  toFetch = global.restApi + "/ingrediente/" + id;
   fetch(toFetch, {method: 'delete'})
  .then(response => {
    return response.json();
  })
  .then(json => {
    if(json.ok){
      let _data = this.state.data;
      _data = _data.filter(item =>{return item._id !== json.ingrediente._id});
      this.setState({isLoaded:true, modal:!this.state.modal, data:_data });
    }
    else
    {
       this.setState({isLoaded:true, error: "Error al obtener el total en el REST", modal: !this.state.modal});
    }
  })
  .catch(err =>{
    this.setState({isLoaded:true, error: err});
  });
}

render() {
  const { error, isLoaded, totalItems, data } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    }else if (!isLoaded) {
      return <div>Loading...</div>;
    }
    else{
      let separate = parseInt(data.length/global.dataByRow,10);
      let _data = [];

      for (let i = 0; i <= separate; i++) {
        _data.push(data.slice(global.dataByRow*i,(i+1)*global.dataByRow));
      }
      return (
        <div>
          <Button color="primary" size="lg" onClick={() => this.props.history.push('/alimento/create')} block>Insertar un alimento</Button>
           {
             _data.map((dataToRow, indexRow)=>{
               return(
                 <Row  key={indexRow}>
                   {dataToRow.map((item, index)=>{
                     let keyCol = indexRow+ "." +index; 
                     return(
                       <Col className="px-0" sm={global.colLength} key={keyCol}>
                       <div className="item-wrap" style={{
                         backgroundImage:"url(" + item.image + ")"}}>
                         <div className="item-container">
                           <div className="contenedor-dato">
                             <h2 className="item-title item-title-home">{item.nombre}</h2>
                             <div className="read-more-home-container">
                               <Row>
                                 <Col sm="6">
                                  <NavLink to={`/alimento/update/${item._id}`} className="orange-read-more">Editar</NavLink>
                                 </Col>
                                 <Col sm="6">
                                  <NavLink to="#" className="orange-read-more" onClick={this.toggle}>Eliminar</NavLink>
                                 </Col>
                               </Row>
                                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                                  <ModalHeader toggle={this.toggle}>Advertencia</ModalHeader>
                                  <ModalBody>
                                    Desea Eliminar el registro
                                  </ModalBody>
                                  <ModalFooter>
                                    <Button color="primary" onClick={() => this.HandlerDeleteRegister(item._id)}>Eliminar</Button>{' '}
                                    <Button color="secondary" onClick={this.toggle}>Cancelar</Button>
                                  </ModalFooter>
                              </Modal>
                             </div>
                           </div>
                         </div>
                       </div>
                       </Col>);
                   })}
                 </Row>); })}
          <Pagination totalItems={totalItems} pageSize={global.pageSize} onSelect={this.getAllIngredientes}/>
        </div>
      );
    }
  }
}

 export default withRouter(Index);