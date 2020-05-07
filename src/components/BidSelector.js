/*
    components/BidSelector.js

    Select form for picking the bid
*/

import React, { Component } from 'react';
import axios from 'axios';
import M from 'materialize-css';
import { endpoint, loadPlayerId } from '../App';

class BidSelector extends Component {
  constructor(props) {
    super(props);
    
    // TODO
    // Need to support 'Shooting the Moon'
    // Users should always be able to bid 10 or 'Shooting the Moon', 
    // even if someone else has already bid one of these values
    this.state = {
      startBid: (this.props.bid === 0 ? 5 : this.props.bid + 1),
      bidValue: (this.props.bid === 0 ? 5 : this.props.bid + 1)
    }

    this.handleBidChange = this.handleBidChange.bind(this); 
    this.setBid = this.setBid.bind(this); 
    this.passBid = this.passBid.bind(this); 
  }
  
  componentDidMount() {
    // Initialize materialize select dropdown
    M.AutoInit();
  }

  handleBidChange(e) {
    e.preventDefault(); 
    this.setState({ bidValue: e.target.value });
  }

  setBid() {
    let bidAttempt = {
      bid: this.state.bidValue,
      player: loadPlayerId()
    };
    axios.post(`${endpoint}/api/game/setBid`, bidAttempt)
    .then((res) => {
      if (res.data.status === "error") {
        console.log(res.data); 
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  passBid() {
    axios.post(`${endpoint}/api/game/passBid`, { player: loadPlayerId() })
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
    let selections = [];
    for (let i = this.state.startBid; i <= 10; i++) {
      selections.push(<option key={i} value={i}>{i}</option>);
    }

    let directions = 'Set a bid or pass...';
    let passBtn = (
      <div className="col s12 m2">
        <button className="btn waves-effect red" onClick={this.passBid}>Pass</button>
      </div>
    );
    if (this.props.bid === 0 && this.props.activeGame.activePlayerIndex === this.props.dealer) {
      directions = 'You are forced to set the bid!'; 
      passBtn = (<span></span>);
    }

    return(
      <div className="row">
        <p>{directions}</p>
        <div className="row">
          <div className="input-field col s4 offset-s2 m6">
            <select id="bid" value={this.state.bidValue} onChange={this.handleBidChange}>
              {selections}
            </select>
          </div>
          <div className="col s4 m2">
            <button className="btn waves-effect" onClick={this.setBid}>Bid</button>
          </div>
          {passBtn}
        </div>
      </div>
    );
  }
}

export default BidSelector;