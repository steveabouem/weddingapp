import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from './components/Main';
import './vendor/template/css/glanz_style.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path = '/' component={Main}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
