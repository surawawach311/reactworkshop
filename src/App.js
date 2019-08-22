import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Footster from './components/Footster';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <NavBar />
      <main role="main">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/about/" component={About} />
          <Route exact path="/register" component={Register} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footster />
    </Router>
  );
}

export default App;
