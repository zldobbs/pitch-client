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
import RoomGameView from './views/RoomGameView';
import RoomStagingView from './views/RoomStagingView'; 

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

// define the endpoint of this frontend
export const siteLink = 'http://localhost:3000';

// manage the endpoint of the server for api requests
export const endpoint = 'http://localhost:8000';

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

export const joinTeam = (teamInfo) => {
  Cookies.set('team', teamInfo, {expires: 1});
  window.location.reload();
}

export const leaveTeam = () => {
  Cookies.remove('team');
  window.location.reload();
}

export const loadTeam = () => {
  let teamInfo = Cookies.get('team');
  teamInfo = (teamInfo == undefined ? undefined : teamInfo.split(','));
  return teamInfo; 
}