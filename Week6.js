class Card { //defines the card class
  constructor(rank, suit) { //2 parameters & assigns them as properties to each instance of class, as down below:
    this.rank = rank;
    this.suit = suit;
  }
}

//define the Deck class
class Deck { //collection of cards
  constructor() { //creates a deck of 52 cards
    this.cards = []; //holds the cards in the deck
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']; //declares a variable ranks and assigns an array of strings of the cards
    const suits = ['♠', '♥', '♦', '♣'];//declares a variable suits and assigns an array of strings with the 4 suits of the cards in a deck
    for (let suit of suits) { //iterates over each element in the suit array
      for (let rank of ranks) { //iterates over each element in the ranks array
        this.cards.push(new Card(rank, suit)); //creates a new card object using rank/suit values & pushes it into the cards array
      }
    }
    this.shuffle(); // shuffle the order of cards in the array
  }

  shuffle() { //shuffle the order of the cards in the deck
    for (let i = this.cards.length - 1; i > 0; i--) { //iterates through the cards & swaps each card with another random card
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  deal() { //returns the top card from the deck, dealing a card from the top of the deck 
    return this.cards.pop();
  }
}

class Player { 
  constructor(name) { //takes one parameter
    this.name = name; //sets player's name
    this.hand = []; //hold the cards that the player has in their hand
    this.points = 0; //the points starts from 0
  }
  //method
  playCard() { //player playing a card
    return this.hand.pop(); //return & removes the last card from player's hand
  }

  addPoints(points) { //it takes one parameter & add points to the player
    this.points += points; //increments points to the player score
  }

  get score() { 
    return this.points; //returns the points when the score getter method is accessed
  }

  get handSize() {
    return this.hand.length; //returns the number of cards in the player's hand
  }
}

class Game {
  constructor() {
    this.deck = new Deck(); //creates a new instance of deck class & assigns it to deck
    this.player1 = new Player('Player 1'); // game has a player named Player 1
    this.player2 = new Player('Player 2'); // player named Player 2
    this.dealCards(); //deal the cards to the players
  }

  dealCards() {
    while (this.deck.cards.length > 0) { //loop will continue as long as there are cards left in the deck
      this.player1.hand.push(this.deck.deal()); //takes a card from deck & adds it to player 1 hand
      this.player2.hand.push(this.deck.deal()); //same action above with player 2
    }
  }

  playTurn() {
    const card1 = this.player1.playCard(); //removes & returns the top card from player1's hand, storing it in the card1
    const card2 = this.player2.playCard(); //same action above but with player2 
    const rank1 = this.getRankValue(card1.rank); //gets the numerical value of the rank card1 using the getRankValue & stores it in the rank1
    const rank2 = this.getRankValue(card2.rank); //same above but card2 / rank2
    if (rank1 > rank2) {
      this.player1.addPoints(1);
    } else if (rank1 < rank2) {
      this.player2.addPoints(1);
    } //determine the winner of each turn & update the players' scores
  }

  getRankValue(rank) { //converts the rank of a card into its numerical value
    const values = {
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
      '6': 6,
      '7': 7,
      '8': 8,
      '9': 9,
      '10': 10,
      'J': 11,
      'Q': 12,
      'K': 13,
      'A': 14,
    };
    return values[rank];
  }
  

  playGame() {
    while (this.player1.handSize > 0 && this.player2.handSize > 0) { //loop continues as long both players have cards in their hands
      console.log('Player 1 Score:', this.player1.score); //current score
      console.log('Player 2 Score:', this.player2.score); //current score
      this.playTurn(); //both players play a card & the winner earns points
    }
    this.displayScore();
  }

  displayScore() { //show current scores of both players & determines the winner
    console.log(`${this.player1.name}: ${this.player1.score}`);
    console.log(`${this.player2.name}: ${this.player2.score}`);
    console.log(`Winner: ${this.player1.points > this.player2.points ? this.player1.name : this.player2.name}`);
  }
}

// Run the game
const game = new Game();
game.playGame();