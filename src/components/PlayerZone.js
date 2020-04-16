/*
    components/PlayerZone

    Display for a player (not user) 
    These are incredibly similar to the UserZone,
    but they will be much smaller
*/

import React, { Component } from 'react';

import Card from './Card';

class PlayerZone extends Component {
    // TODO Set the background color based on the team
    render() {
        // Need to update the number of cards we are displaying based on how many user has left 
        let cards = [];
        let numCardsLeft = 9;
        for (let i = 0; i < numCardsLeft; i++) {
          cards.push(<Card key={i} cardNum="green_back"></Card>);
        }

        return(
            <div className="col s12 grey center-align z-depth-3 player-zone">
              <p>{this.props.name}</p>
              <div className="card-row">
                {cards}
              </div>
            </div>
        );
    }
}

export default PlayerZone;