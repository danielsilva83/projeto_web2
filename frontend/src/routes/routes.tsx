import React from 'react';
import { Signup, Login, About, Fractions, Contact } from '../screens/';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Routes: React.FC = () => {
  return (
    <Router>
      <Route exact path="/" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/about" component={About} />
      <Route exact path="/Fractions" component={Fractions} />
      <Route exact path="/contact" component={Contact} />
    </Router>
  );
};

export default Routes;
