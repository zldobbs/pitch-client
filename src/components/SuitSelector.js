/*
    components/SuitSelector.js

    Select form for picking the suit
*/

import React, { Component } from 'react';

class SuitSelector extends Component {
  render() {
    // TODO Can turn this into a for loop 
    const clubsImgUrl = require('../assets/img/cards/honor_clubs.png');
    const diamondsImgUrl = require('../assets/img/cards/honor_diamond.png');
    const heartsImgUrl = require('../assets/img/cards/honor_heart.png');
    const spadesImgUrl = require('../assets/img/cards/honor_spade.png');

    // TODO...
    // - Click a suit once to highlight it
    // - Click it again to confirm
    // --> This flow should be similar to how a user selects cards 
    // --> Will need to do some pic editing to get the highlight working

    return(
      <div className="row suit-selection-row">
        <div className="col s6">
          <img className="honor-card-img" src={clubsImgUrl} alt="Clubs" />
          <p className="slim-p">Clubs</p>
        </div>
        <div className="col s6">
          <img className="honor-card-img" src={diamondsImgUrl} alt="Diamonds" />
          <p className="slim-p">Diamonds</p>
        </div>
        <div className="col s6">
          <img className="honor-card-img"  src={heartsImgUrl} alt="Hearts" />
          <p className="slim-p">Hearts</p>
        </div>
        <div className="col s6">
          <img className="honor-card-img" src={spadesImgUrl} alt="Spades" />
          <p className="slim-p">Spades</p>
        </div>
      </div>
    );
  }
}

export default SuitSelector;