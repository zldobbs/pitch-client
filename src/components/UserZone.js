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
        for (let i = 0; i < this.props.hand.length; i++) {
          cards.push(<Card key={i} cardNum={this.props.hand[i]}></Card>);
        }

        return(
            <div className="col s12 grey center-align z-depth-3 user-zone">
              <p>{this.props.name}</p>
              <div className="card-row">
                {cards}
              </div>
            </div>
        );
    }
}

export default UserZone;