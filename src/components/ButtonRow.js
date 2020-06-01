/*
    components/ButtonRow.js

    A row of dynamic interactive features for users to play the game with 
*/

import React, { Component } from 'react';
import BidSelector from './BidSelector'; 
import SuitSelector from './SuitSelector'; 
import GoOutButton from './GoOutButton';

class ButtonRow extends Component {
  // Can do this by checking the cards the given player has. Use similar logic as CardPicker...
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

    // Need to check if the user has no on cards left 
    return(
      <div className="row">
        {display}
        <GoOutButton suit={this.props.suit} player={this.props.player}></GoOutButton>
      </div>
    );
  }
}

export default ButtonRow;