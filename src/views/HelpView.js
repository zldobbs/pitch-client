/*
  View - MissingView
  
  404 error handler
*/

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HelpView extends Component {
  render() {
    return(
      <div className="container">
        <div className="row center-align">
          <div className="col s12 m6 offset-m3">
            <h3>How to play pitch</h3>
          </div>
        </div>
        <div className="row">
          <div className="col s4 m4 offset-m4 center-align">
            <p><Link to="/">Home</Link></p>
          </div>
        </div>
      </div>
    );
  }
}

export default HelpView;