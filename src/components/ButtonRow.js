/*
    components/ButtonRow.js

    A row of dynamic interactive features for users to play the game with 
*/

import React, { Component } from 'react';
import axios from 'axios'; 
import { endpoint } from '../App';
import BidSelector from './BidSelector'; 
import SuitSelector from './SuitSelector'; 
import GoOutButton from './GoOutButton';

class ButtonRow extends Component {
  constructor(props) {
    super(props);

    this.handleAdvanceRound = this.handleAdvanceRound.bind(this);
  }

  handleStartNewGame() {
    let startNewGameRequest = {
      room: this.props.room
    }
    axios.post(`${endpoint}/api/room/newGame`, startNewGameRequest)
    .then((res) => {
      if (res.data.status === "error") {
        console.log(res.data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleAdvanceRound() {
    let advanceRoundRequest = {
      activePlayer: this.props.activeGame.activePlayer._id
    }
    axios.post(`${endpoint}/api/game/advanceRound`, advanceRoundRequest)
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

    let buttonDisplay = (<span></span>);
    // Check if a team has won the game
    if (this.props.activeGame.team1Score >= 31 || this.props.activeGame.team2Score >= 31) {
      buttonDisplay = (
        <div className="row">
          <div className="col s12 center-align">
            <button className="btn waves-effect" onClick={() => this.handleStartNewGame()}>Start New Game</button>
          </div>
        </div>
      );
    }
    // Check if all players have played this round. Prepare to start next round 
    else if (
      (this.props.team1.player1.playedCard !== -1 || this.props.team1.player1.cardCount === 0) &&
      (this.props.team1.player2.playedCard !== -1 || this.props.team1.player2.cardCount === 0) &&
      (this.props.team2.player1.playedCard !== -1 || this.props.team2.player1.cardCount === 0) &&
      (this.props.team2.player2.playedCard !== -1 || this.props.team2.player2.cardCount === 0)
    ) {
      buttonDisplay = (
        <div className="row">
          <div className="col s12 center-align">
            <button className="btn waves-effect" onClick={() => this.handleAdvanceRound()}>Next Round</button>
          </div>
        </div>
      );
    }
    else {
      buttonDisplay = (<GoOutButton suit={this.props.suit} player={this.props.player} activePlayerId={this.props.activeGame.activePlayer._id}></GoOutButton>);
    }

    // Need to check if the user has no on cards left 
    return(
      <div className="row">
        {display}
        {buttonDisplay}
      </div>
    );
  }
}

export default ButtonRow;