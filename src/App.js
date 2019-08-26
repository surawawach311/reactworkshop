import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import rootReducer from './redux/reducers/index';
import configurestore from './redux/configureStroe'
import { PersistGate } from 'redux-persist/integration/react'

import PrivateRoute from './guard/auth';

import './App.css';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Footster from './components/Footster';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Shop from './pages/Shop';
import Cart from './pages/Cart';

// const store = createStore(rootReducer);
const { store, persistor } = configurestore();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <NavBar />
          <main role="main">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/home" component={Home} />
              <PrivateRoute exact path="/about" component={About} />
              <Route exact path="/shop" component={Shop} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/shop/:id" component={Shop} />

              <Route component={NotFound} />
            </Switch>
          </main>
          <Footster />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
