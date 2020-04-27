/*
    components/PlayerZone

    Display for a player (not user) 
    These are incredibly similar to the UserZone,
    but they will be much smaller
*/

import React, { Component } from 'react';

import Card from './Card';

class PlayerZone extends Component {
  render() {
    // Need to update the number of cards we are displaying based on how many user has left 
    let cards = [];
    for (let i = 0; i < this.props.player.cardCount; i++) {
      cards.push(<Card key={i} cardNum="green_back"></Card>);
    }

    console.log(this.props); 

    return(
      <div className={"col s12 center-align player-zone " + (this.props.team === 1 ? 'team-1-color ' : 'team-2-color ') + (this.props.activePlayer === this.props.player._id ? 'colored-z-depth-3' : 'z-depth-3')}>
        <p>{this.props.player.displayName}</p>
        <div className="card-row">
          {cards}
        </div>
      </div>
    );
  }
}

export default PlayerZone;