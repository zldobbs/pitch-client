/*
  View - RoomGameView
  
  View for the game 
*/

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RoomGameView extends Component {
  constructor(props) {
    super(props);
  }

  /*componentDidMount() {
    // Retrieve the current room
    // TODO verify the user is in this room
    // TODO this fetch route probably shouldn't point to staging 
    axios.get(`${endpoint}/api/room/${this.props.match.params.roomId}`)
    .then((res) => {
      if (res.data.status == "success") {
        this.setState({ 
          roomId: res.data.room.short_id,
          team1: res.data.room.team1,
          team2: res.data.room.team2
        });

        // TODO need to fetch this player's cards
        socket.emit('join-room', res.data.room.short_id);
      }
      else {
        this.setState({ room: '' });
      }
    }).catch((err) => {
      console.log(err);
      this.setState({ room: '' });
    });
  }*/

  render() {
    return(
      <div className="container">
        <div className="row center-align">
          <div className="col s12 m6 offset-m3">
            <h3>Time to play...</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default RoomGameView;