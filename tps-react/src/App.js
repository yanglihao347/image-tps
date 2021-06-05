import React from 'react';
import './App.css';
import Main from './pages/Main/index';
import Login from './pages/Login/index';

import {
  HashRouter as Router,
  Route,
} from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    // this.getList(1,20);
  }


  render() {

    return (
      <div>
        <Router>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Router>
      </div>
    );
  }
}

export default App;
