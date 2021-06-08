import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Main from './pages/Main/index';
import Login from './pages/Login/index';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Route exact path='/'>
          <Main />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
      </Router>
    );
  }
}

export default App;
