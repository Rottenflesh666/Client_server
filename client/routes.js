import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
/* views */
import App from './src/App';
import Login from './src/components/Login/Login';
export default () => (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/login" component={Login} />
    </div>
  </Router>
);