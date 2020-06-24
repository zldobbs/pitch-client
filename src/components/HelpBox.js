/* 
    components/HelpBox

    Display help info for the game
*/

import React, { Component } from 'react';
import HelpInfo from './HelpInfo';

class HelpBox extends Component {
  render() {
    return(
      <div>
        <div className="dialog-backdrop" onClick={this.props.closeHandler}></div>
        <div className="container dialog z-depth-3">
          <HelpInfo></HelpInfo>
        </div>
      </div>
    )
  }
}

export default HelpBox; 