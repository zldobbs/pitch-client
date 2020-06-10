import React, { Component } from 'react';
import M from 'materialize-css';
import './App.css';

// packages 
import socketIOClient from 'socket.io-client';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';

// components
import ScrollToTop from './components/ScrollToTop'; 

// views 
import HelpView from './views/HelpView'; 
import LandingView from './views/LandingView';
import LoginView from './views/LoginView'; 
import MissingView from './views/MissingView';
import RegisterView from './views/RegisterView'; 
import RoomGameView from './views/RoomGameView';
import RoomStagingView from './views/RoomStagingView'; 

class App extends Component {
  componentDidMount() {
    M.AutoInit();
    window.scrollTo(0, 0);
  }

  render() {
  return (
    <BrowserRouter>
    <div className="container-fluid">
      <ScrollToTop>
        <Switch>
          <Route exact path="/" component={LandingView}></Route>
          <Route exact path="/help" component={HelpView}></Route>
          <Route exact path="/login" component={LoginView}></Route>
          <Route exact path="/register" component={RegisterView}></Route>
          <Route exact path="/room/:roomId" component={RoomGameView}></Route>
          <Route exact path="/room/staging/:roomId" component={RoomStagingView}></Route>
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

// endpoint defines backend URL, siteLink defines frontend URL 
let endpointString;
let siteLinkString; 

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // dev code
  endpointString = 'http://localhost:8000';
  siteLinkString = 'http://localhost:3000'; 
} else {
  // production code
  endpointString = 'https://dobbs-pitch.herokuapp.com';
  siteLinkString = 'https://dobbs-pitch.herokuapp.com'; 
}

export const endpoint = endpointString; 
export const siteLink = siteLinkString; 

// Setup socket connection with backend 
export const socket = socketIOClient(endpoint);

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

export const savePlayerId = (playerId) => {
  Cookies.set('playerId', playerId, {expires: 1});
  window.location.reload();
}

export const deletePlayerId = () => {
  Cookies.remove('playerId');
  window.location.reload();
}

export const loadPlayerId = () => {
  return Cookies.get('playerId');
}