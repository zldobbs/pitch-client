/*
  View - MissingView
  
  404 error handler
*/

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MissingView extends Component {
  render() {
    return(
      <div className="row">
        <div className="col s12 m6 offset-m3 center-align">
          <h1>404 Error</h1>
          <p>The page you are looking for doesn't exist, sorry dude.</p>
        </div>
      </div>
    );
  }
}

export default MissingView;