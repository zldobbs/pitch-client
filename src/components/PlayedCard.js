/*
    components/PlayedCard.js

    Displays the card played, the player that played it, and their team
*/

import React, { Component } from 'react';

import Card from './Card';

class PlayedCard extends Component {
  render() {
    return(
      <div className="col s6 m3">
        {
          this.props.player.playedCard > -1 &&
          <div className={"played-card-box z-depth-3 center-align " + (this.props.team === 1 ? "team-1-color" : "team-2-color")}>
            <p>{this.props.player.displayName}</p>
            <Card cardNum={this.props.player.playedCard} highlight={false}></Card>
          </div>
        }
      </div>
    );
  }
}

export default PlayedCard;