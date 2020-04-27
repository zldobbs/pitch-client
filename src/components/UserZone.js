 /*
    components/UserZone

    The User's play area
*/

import React, { Component } from 'react';

import Card from './Card';

class UserZone extends Component {
  // TODO Set the background color based on the team
  render() {
    // Need to update the number of cards we are displaying based on how many user has left 
    let cards = [];
    for (let i = 0; i < this.props.player.hand.length; i++) {
      cards.push(<Card key={i} cardNum={this.props.player.hand[i]}></Card>);
    }

    return(
      <div className={"col s12 center-align z-depth-3 user-zone " + (this.props.team === 1 ? 'team-1-color ' : 'team-2-color ') + (this.props.activePlayer === this.props.player._id ? 'colored-z-depth-3' : 'z-depth-3')}>
        <p>{this.props.player.displayName}</p>
        <div className="card-row">
          {cards}
        </div>
      </div>
    );
    }
}

export default UserZone;