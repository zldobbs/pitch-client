import React, { Component } from 'react';
import './App.css';

// packages 
import socketIOClient from 'socket.io-client';
import axios from 'axios';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';

// components 
import Navbar from './components/Navbar'; 
import ScrollToTop from './components/ScrollToTop'; 

// views 
import HelpView from './views/HelpView'; 
import LandingView from './views/LandingView';
import LoginView from './views/LoginView'; 
import MissingView from './views/MissingView';
import RegisterView from './views/RegisterView'; 

class App extends Component {
  componentDidMount() {
  window.scrollTo(0, 0);
  }

  render() {
  return (
    <BrowserRouter>
    <div className="container-fluid">
      <Navbar></Navbar>
      
      <ScrollToTop>
        <Switch>
          <Route exact path="/" component={LandingView}></Route>
          <Route exact path="/help" component={HelpView}></Route>
          <Route exact path="/login" component={LoginView}></Route>
          <Route exact path="/register" component={RegisterView}></Route>
          {/* default case */}
          <Route component={MissingView}></Route>
        </Switch>
      </ScrollToTop>
    </div>
    </BrowserRouter>
  );
  }
}

export default App;

// manage the endpoint of the server for api requests
export const endpoint = 'http://localhost:8000';

export const loginUser = (username) => {
  Cookies.set('user', username, { expires: 1 });
  window.location.reload();
}

export const logoutUser = () => {
  Cookies.remove('user');
  window.location.reload();
}

export const loadUser = () => {
  let user = Cookies.get('user');
  return user;
}
