import React from 'react';
import {NavLink} from 'react-router-dom'
import '../css/header.css'
import '../fonts/icomoon/style.css'


import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem } from 'reactstrap';

import staticNavigation  from '../contents/header.json';

function GetNav(props) {
  return(
    <NavItem>
      <NavLink to={props.item.Href} className="nav-link">{props.item.Title}</NavLink>
    </NavItem>
  );
}



class Header extends React.Component {
  constructor(props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      error: null,
      isLoaded: false,
      json: null
    };
  }
    componentDidMount() {
    fetch('/helloWorld.html')
      .then(res => {
        return  staticNavigation;
      })
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            json: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { error, isLoaded, json } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    }else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
          return (
            <div>
            <Navbar color="dark" dark expand="md">
              <NavLink to="/" className="navbar-brand">{json.Title}</NavLink>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  {json.Items.map((element, index)=>{
                    return (<GetNav item={element}  key={index} />);
                  })}
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        );
    }
  }
}

export default Header;