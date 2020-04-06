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
import LandingView from './views/LandingView';
import HelpView from './views/HelpView'; 
import MissingView from './views/MissingView';

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

export const loginUser = (username) => {
  Cookies.set('user', username, { expires: 1 });
}

export const logoutUser = () => {
  Cookies.remove('user');
}

export const loadUser = () => {
  let user = Cookies.get('user');
  return user;
}
