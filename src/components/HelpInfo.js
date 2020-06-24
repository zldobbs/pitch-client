/*
  View - HelpInfo
  
  Details how to play the game 
*/

import React, { Component } from 'react';

class HelpInfo extends Component {
  render() {
    return(
      <div className="container">
        <div className="row center">
          <div className="col s12 m6 offset-m3">
            <h3>How to play pitch</h3>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m8 offset-m2 center">
            <h4>Background</h4>
            <p>Pitch is a trump, partner game. There are a few different variations that can be played, but the version that is offered in this game is 4-person, 10 point pitch. There are two teams of two competing to earn a total of 31 points.</p>
            <h4>Bidding</h4>
            <p>Every round of a pitch game begins with bidding. In this game a team will need to set the bid at anywhere between 5-10 points. A team will set the bid at how many points they believe they can earn in a given round. If the team fails to get these points, they will be "set" and lose the amount they bid. However, the team that sets the bid gets the advantage of setting the trump suit. This scenario allows users to weigh the risk/reward of the hand they have at the start of the game.</p>
            <h4>Gameplay</h4>
            <p>Every hand will begin with the player that won the previous hand. That player will start the round. If they play a card from the trump suit, all other players must also play a trump card. If they play off the trump suit, other players may play on or off suit. If a player is required to play on suit and does not have any trump cards, they are forced to "go out" for the rest of the round.</p>
            <p>Every player will have a chance to play a card in the round. The player with the highest card will win the hand, giving their team as many points that were laid. The order of card strength is as follows: 2, 3, 4, 5, 6, 7, 8, 9, 10, Little Joker, Big Joker, Off Jack, On Jack, Queen, King, Ace.</p>
            <h4>Point Cards</h4>
            <p>Only cards in the trump suit are worth points. The cards worth points are the 2, 3, 10, Little Joker, Big Joker, Off Jack, On Jack, and Ace.</p>
            <p>The 2 is a special card in that it will automatically give the team that plays the card a point. It can not be won by the other team.</p>
            <p>The 3 is another special card - it is worth 3 points (all other point cards are only worth 1). This card is very low though and easy to lose to the enemy team if not played carefully.</p>
            <p>The Off Jack corresponds to the Jack of the same color suit of the trump suit that is not trump. (i.e. If Diamonds are trump, the Jack of Diamonds is the On Jack while the Jack of Hearts is the Off Jack).</p>
            <p>It is worth noting that the Queen and King are NOT worth points. They are known as "catcher cards". Although they are not worth points, they are still the second and third highest cards in the game and will be very useful cards in winning other player points.</p>
          </div>
        </div>
        <div className="row center">
          <div className="col s12 m6 offset-m3">
            <h4>About</h4>
            <p>This game was developed by <a href="https://www.zachdobbs.life/">Zach Dobbs</a> during the great pandemic of 2020. If you have any issues or recommendations for the app, or if you just want to chat, feel free to send an email to dobbszach@gmail.com.</p>
            <p>Thanks for playing!</p>
          </div>
        </div>
      </div>
    );
  }
}

export default HelpInfo;