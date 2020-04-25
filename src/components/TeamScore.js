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
          <div className="row grey team-score center-align z-depth-3">
            <div className="col s8 team-score-roster">
              <p><b>{this.props.team.name}</b></p>
              <p>{this.props.team.player1DisplayName}</p>
              <p>{this.props.team.player2DisplayName}</p>
            </div>
            <div className="col s4 team-score-points">
              <p>{this.props.team.score}</p>
            </div>
          </div>
        </div>
      );
    }
}

export default TeamScore;