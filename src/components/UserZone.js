 /*
    components/UserZone

    The User's play area
*/

import React, { Component } from 'react';

import Card from './Card';
import axios from 'axios';
import { endpoint, loadPlayerId } from '../App';

class UserZone extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCards: []
    }

    this.handleCardClick = this.handleCardClick.bind(this);
  }

  handleCardClick(cardIndex) {
    if (this.props.activePlayer._id === this.props.player._id) {
      let { selectedCards } = this.state;
      let selectedCard = this.props.player.hand[cardIndex];
  
      let selectedIndex = selectedCards.indexOf(selectedCard); 
      if (selectedIndex >= 0) {
        // TODO For now, doing going to send card when you click it twice
        // Another option could be clicking a confirm button 
        let playCardRequest = {
          card: selectedCard,
          player: loadPlayerId()
        }
        axios.post(`${endpoint}/api/game/playCard`, playCardRequest)
        .then((res) => {
          if (res.data.status === "success") {
            console.log(res.data);
          }
          else {
            console.log(res.data.details); 
          }
        })
        .catch((err) => {
          console.log(err); 
        });
      }
      else {
        selectedCards = [selectedCard];
      }
      this.setState({ selectedCards: selectedCards });
    }
  }
    
  // TODO Set the background color based on the team
  render() {
    // Need to update the number of cards we are displaying based on how many user has left 
    let cards = [];
    for (let i = 0; i < this.props.player.hand.length; i++) {
      cards.push(<Card key={i} cardNum={this.props.player.hand[i]} clickHandler={() => this.handleCardClick(i)} highlight={this.state.selectedCards.indexOf(this.props.player.hand[i]) >= 0}></Card>);
    }

    return(
      <div className={"col s12 center-align z-depth-3 user-zone " + (this.props.team === 1 ? 'team-1-color ' : 'team-2-color ') + (this.props.activePlayer._id === this.props.player._id ? 'colored-z-depth-3' : 'z-depth-3')}>
        <p>{this.props.player.displayName}</p>
        <div className={this.props.player.hand.length > 9 ? "scrolling-card-row" : "card-row"}>
          {cards}
        </div>
      </div>
    );
    }
}

export default UserZone;