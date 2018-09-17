import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/js/Home';
import Error from './components/js/Error';
import Header from './components/js/Header';
import Receta from './components/js/Receta';
import Catalogo from './components/js/Catalogo';

// Alimento
import AlimentoIndex from './components/js/Alimento/Index.js';
import AlimentoCreate from './components/js/Alimento/Create.js';

import './config/localStorage.js';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/receta" component={Receta}  />
            <Route path="/catalogo" component={Catalogo}  />
            <Route path="/alimento/index" component={AlimentoIndex}  />
            <Route path="/alimento/create" component={AlimentoCreate}  />
            <Route  component={Error} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
