/*
    components/ButtonRow.js

    A row of dynamic interactive features for users to play the game with 
*/

import React, { Component } from 'react';
import BidSelector from './BidSelector'; 
import SuitSelector from './SuitSelector'; 

class ButtonRow extends Component {
  // TODO will need to render the button to go out at anytime, even if player is not active
  render() {
    let display = (<span></span>); 
    if (this.props.activeGame.activePlayer._id === this.props.player._id) {
      // Check if user is up to set the bid 
      if (this.props.suit === -1) {
        // If the active user is the bidder, they must be ready to pick the suit 
        if (this.props.activeGame.biddingPlayer !== null && this.props.activeGame.activePlayer._id === this.props.activeGame.biddingPlayer._id) {
          display = (<SuitSelector></SuitSelector>);
        }
        else {
          display = (<BidSelector bid={this.props.bid} dealer={this.props.dealer} activeGame={this.props.activeGame}></BidSelector>);
        }
      }
    }

    return(
      <div className="row">
        {display}
      </div>
    );
  }
}

export default ButtonRow;