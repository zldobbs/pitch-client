/*
    components/CardPicker.js

    Dialog to let users select multiple cards
*/

import React, { Component } from 'react';
import axios from 'axios'; 

import Card from './Card';
import { endpoint, loadPlayerId } from '../App';

class CardPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pointCards: [1, 2, 9, 13].map(x => x + (13 * this.props.suit))
        .concat(this.getJacks(this.props.suit))
        .concat(53, 54),
      ownedPoints: [],
      selectedCards: []
    }

    this.handleCardClick = this.handleCardClick.bind(this); 
    this.handleConfirmedClick = this.handleConfirmedClick.bind(this); 
  }

  componentDidMount() {
    let points = [];
    for (let i = 0; i < this.props.hand.length; i++) {
      if (this.state.pointCards.indexOf(this.props.hand[i]) >= 0) {
        points.push(this.props.hand[i]); 
      }
    }

    this.setState({
      ownedPoints: points,
      selectedCards: points
    });
  }

  getJacks(suit) {
    switch (suit) {
      case 0:
      case 3: {
        return [10, 49];
      }
      case 1:
      case 2: {
        return [36, 23];
      }
      default: {
        console.log("Invalid suit provided: " + suit);
        return; 
      }
    }
  }

  handleCardClick(cardIndex) {
    let { selectedCards } = this.state;
    let selectedCard = this.props.hand[cardIndex];
    if (this.state.ownedPoints.indexOf(selectedCard) >= 0) {
      return; 
    }

    let selectedIndex = selectedCards.indexOf(selectedCard); 
    if (selectedIndex >= 0) {
      selectedCards.splice(selectedIndex, 1); 
    }
    else {
      selectedCards.push(selectedCard);
    }
    this.setState({ selectedCards: selectedCards });
  }

  handleConfirmedClick() {
    if (this.state.selectedCards.length !== 6) {
      return; 
    }

    // TODO Need to verify that the user is not burning points!
    let pickCardsRequest = {
      hand: this.state.selectedCards,
      activePlayer: this.props.activePlayer,
      player: loadPlayerId()
    }
    axios.post(`${endpoint}/api/game/pickCards`, pickCardsRequest)
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
    let cards = [];
    for (let i = 0; i < this.props.hand.length; i++) {
      cards.push(<Card key={i} cardNum={this.props.hand[i]} clickHandler={() => this.handleCardClick(i)} highlight={this.state.selectedCards.indexOf(this.props.hand[i]) >= 0}></Card>);
    }

    return(
      <div className="dialog-backdrop">
        <div className="container dialog z-depth-3">
          <div className="row">
            <div className="col s12 center">
              <h5>Select exactly 6 cards. The suit is {this.props.suitName}</h5>
            </div>
          </div>
          <div className="row">
            <div className="col s12 center">
              <div className="scrolling-card-row">
                {cards}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col s12 center">
              <p>You have selected {this.state.selectedCards.length} cards</p>
              <button className="btn waves-effect" disabled={this.state.selectedCards.length !== 6} onClick={this.handleConfirmedClick}>Confirm</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CardPicker;