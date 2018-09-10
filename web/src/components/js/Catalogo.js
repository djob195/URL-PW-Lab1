import React from "react";
import {NavLink} from 'react-router-dom'
import { Container,Col,Row,Card } from 'reactstrap';
import '../css/catalogo.css'

const Catalogo = () =>{
    return (
        <Container>
            <Row>
                    <Col sm={{ size: 6, order: 2, offset: 1 } }>
                        <Card body inverse color="info">
                            <NavLink to='/alimento/index' className="cardCatalogo" >Alimentos</NavLink>
                        </Card>
                    </Col>
            </Row>
        </Container>
    );
}

export default Catalogo;