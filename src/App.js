import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from './components/Main';
import GuestList from './components/GuestList';
import Login from './components/Admin/Login';
import './vendor/template/css/glanz_style.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path = '/' component={Main}/>
          <Route path = '/administrateur' component={Login}/>
          <Route path = '/invites' component={GuestList}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
