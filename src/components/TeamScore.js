 /*
    components/TeamScore

    Displays the teams roster and score
*/

import React, { Component } from 'react';

class TeamScore extends Component {
    // TODO Set the background color based on the team
    render() {
      return(
        <div className="col s5 offset-s1">
          <div className={"row team-score center-align z-depth-3 " + (this.props.teamNum === 1 ? 'team-1-color' : 'team-2-color')}>
            <div className="col s8 team-score-roster">
              <p><b>{this.props.team.name}</b></p>
              <p>{this.props.team.player1.displayName}</p>
              <p>{this.props.team.player2.displayName}</p>
            </div>
            <div className="col s4 team-score-points">
              <p>{this.props.teamNum === 1 ? this.props.game.team1Score : this.props.game.team2Score}</p>
            </div>
            <div className="col s12 team-score-roster">
              <p>Points gained this round: {this.props.teamNum === 1 ? this.props.game.team1PointsInRound : this.props.game.team2PointsInRound}</p>
            </div>
          </div>
        </div>
      );
    }
}

export default TeamScore;