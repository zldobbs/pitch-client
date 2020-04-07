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
        <div class="row center-align">
          <div class="col s12 m6 offset-m3">
            <h3>How to play pitch</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default HelpView;