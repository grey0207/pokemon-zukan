import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import 'spectre.css';
import '../node_modules/spectre.css/dist/spectre-icons.css';
import Detail from './views/Detail'
import Home from './views/Home'

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <Route exact path="/" component={ Home } />
          <Route path="/detail/:page" component={ Detail }/>
        </div>
      </HashRouter>
    );
  }
}

export default App;
