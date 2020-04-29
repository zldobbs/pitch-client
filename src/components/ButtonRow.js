/*
    components/ButtonRow.js

    A row of dynamic interactive features for users to play the game with 
*/

import React, { Component } from 'react';
import BidSelector from './BidSelector'; 

class ButtonRow extends Component {
  constructor(props) {
    super(props); 
  
    this.state = {
      display: (<span></span>)
    }
  }

  componentDidMount() {
    // Check if user is up to do something 
    if (this.props.activePlayer._id !== this.props.player._id) {
      return; 
    }

    // Check if user is up to set the bid 
    if (this.props.suit === -1) {
      this.setState({
        display: (<BidSelector bid={this.props.bid}></BidSelector>)
      })
    }
  }

  // TODO will need to render the button to go out at anytime, even if player is not active
  render() {
    return(
      <div className="row">
        {this.state.display}
      </div>
    );
  }
}

export default ButtonRow;