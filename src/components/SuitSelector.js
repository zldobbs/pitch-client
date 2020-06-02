/*
    components/SuitSelector.js

    Select form for picking the suit
*/

import React, { Component } from 'react';
import axios from 'axios';
import { endpoint, loadPlayerId } from '../App';

class SuitSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      suitDialogOpen: false
    };

    // this.setSuit = this.setSuit.bind(this); 
  }

  // TODO Could implement some confirmation handling instead of setting straight away
  setSuit(suit) {
    let suitAttempt = {
      suit: suit,
      player: loadPlayerId()
    };
    axios.post(`${endpoint}/api/game/setSuit`, suitAttempt)
    .then((res) => {
      if (res.data.status === "error") {
        console.log(res.data); 
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    // TODO Can turn this into a for loop 
    const clubsImgUrl = require('../assets/img/cards/honor_clubs.png');
    const diamondsImgUrl = require('../assets/img/cards/honor_diamond.png');
    const heartsImgUrl = require('../assets/img/cards/honor_heart.png');
    const spadesImgUrl = require('../assets/img/cards/honor_spade.png');

    return(
      <div>
        <p>You have won the bid! Select your desired suit.</p>
        <div className="row suit-selection-row">
          <div className="col s6">
            <img className="honor-card-img" src={clubsImgUrl} alt="Clubs" onClick={() => this.setSuit(0)}/>
            <p className="slim-p" onClick={() => this.setSuit(0)}>Clubs</p>
          </div>
          <div className="col s6">
            <img className="honor-card-img" src={diamondsImgUrl} alt="Diamonds" onClick={() => this.setSuit(1)}/>
            <p className="slim-p" onClick={() => this.setSuit(1)}>Diamonds</p>
          </div>
          <div className="col s6">
            <img className="honor-card-img" src={heartsImgUrl} alt="Hearts" onClick={() => this.setSuit(2)}/>
            <p className="slim-p" onClick={() => this.setSuit(2)}>Hearts</p>
          </div>
          <div className="col s6">
            <img className="honor-card-img" src={spadesImgUrl} alt="Spades" onClick={() => this.setSuit(3)}/>
            <p className="slim-p" onClick={() => this.setSuit(3)}>Spades</p>
          </div>
        </div>
      </div>
    );
  }
}

export default SuitSelector;