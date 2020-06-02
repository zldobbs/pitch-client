/*
    components/GoOutButton.js

    Button to let user go out of the current hand
*/

import React, { Component } from 'react';
import axios from 'axios';
import { loadPlayerId, endpoint } from '../App';

class GoOutButton extends Component {
  constructor(props) {
    super(props);

    this.checkCardsLeftOnSuit = this.checkCardsLeftOnSuit.bind(this);
  }

  checkCardsLeftOnSuit() {
    let startRange = -1;
    let endRange = -1;
    let offJack = -1; 

    switch(this.props.suit) {
      case 0:
        startRange = 1;
        endRange = 13;
        offJack = 49;
        break;
      case 1:
        startRange = 14;
        endRange = 26;
        offJack = 36;
        break;
      case 2:
        startRange = 27;
        endRange = 39;
        offJack = 23;
        break;
      case 3:
        startRange = 40;
        endRange = 52;
        offJack = 10;
        break;
      default:
        console.log("Invalid suit provided");
        break; 
    }
    
    for (let i = 0; i < this.props.player.hand[i]; i++) {
      let card = this.props.player.hand[i];
      if (card === offJack || card > 52 || (card >= startRange && card <= endRange)) {
        return true; 
      }
    }

    return false; 
  }

  handleGoOut() {
    // TODO Send request to go out 
    // Check for validity on backend too 
    // Backend should handle if the person going out is the active player or not 
    let goOutAttempt = {
      activePlayer: this.props.activePlayerId,
      player: loadPlayerId()
    };
    axios.post(`${endpoint}/api/game/goOut`, goOutAttempt)
    .then((res) => {
      if (res.data.status === "error") {
        console.log(res.data); 
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  // Can do this by checking the cards the given player has. Use similar logic as CardPicker...
  render() {
    let display = (<span></span>);  
    if (this.props.suit !== -1 && !this.checkCardsLeftOnSuit()) {
      display = (
        <div className="col s12 center-align">
          <button className="btn waves-effect" onClick={() => this.handleGoOut()}>Go Out</button>
        </div>
      );
    }

    // Need to check if the user has no on cards left 
    return(
      <div className="row">
        {display}
      </div>
    );
  }
}

export default GoOutButton;