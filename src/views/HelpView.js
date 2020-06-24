/*
  View - HelpView
  
  Details how to play the game 
*/

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HelpInfo from '../components/HelpInfo';

class HelpView extends Component {
  render() {
    return(
      <div className="container">
        <div className="row">
          <div className="col s4 m4 offset-m4 center-align">
            <p><Link to="/">Home</Link></p>
          </div>
        </div>
        <HelpInfo></HelpInfo>
      </div>
    );
  }
}

export default HelpView;