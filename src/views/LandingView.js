/*
  View - LandingView
  
  View for when user first opens website - landing page
*/

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LandingView extends Component {
  render() {
    return(
      <div className="container">
        <div className="row">
          <div className="col s12 m6 offset-m3 center-align white-text">
            <h1>Pitch</h1>
            <p>
              Welcome to the online pitch game. For basic rules talk to Seth John or visit
              the <Link to="/help">Help</Link> page
            </p>
            <p>
              Login to keep stats on your account, or play as anonymous user.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m4 offset-m4 center-align">
            <button className="btn waves-effect">Create Game</button>
          </div>
        </div>
        <div className="row center-align">
          <p>If you already have a game ready, enter the ID below to join.</p>
        </div>
        <div className="row center-align">
          <div className="col s9 m3 offset-m4 input-field inline">
            <input id="room-id" type="text" className="validate" />
            <label htmlFor="room-id">Game ID</label>
          </div>
          <div className="col s2 m1">
            <button className="btn waves-effect">Join</button>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingView;