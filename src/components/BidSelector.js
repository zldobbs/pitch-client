/*
    components/BidSelector.js

    Select form for picking the bid
*/

import React, { Component } from 'react';
import M from 'materialize-css';

class BidSelector extends Component {
  componentDidMount() {
    M.AutoInit();
  }

  render() {
    /*
      Plan of attack...
      - Set/hit -> send request to server with details
      - Update game state accordingly 
      - Socket emit the updated game state to all players
      --> An additional socket may be needed to update the status message (or can we do this in a single emit..?)
    */
    let startBid = (this.props.bid === 0 ? 5 : this.props.bid); 
    let selections = [];
    for (let i = startBid; i <= 10; i++) {
      selections.push(<option key={i} value={i}>{i}</option>);
    }

    return(
      <div className="row">
        <p>Set a bid or pass...</p>
        <div className="row">
          <div className="input-field col s4 offset-s2 m6">
            <select id="bid">
              {selections}
            </select>
          </div>
          <div className="col s4 m2">
            <button className="btn waves-effect">Set</button>
          </div>
          <div className="col s12 m2">
            <button className="btn waves-effect red">Pass</button>
          </div>
        </div>
      </div>
    );
  }
}

export default BidSelector;