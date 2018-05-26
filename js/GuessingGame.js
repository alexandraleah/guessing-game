//do I need to declare the variable var outside the  functions?
var game;
//generate the random number
function generateWinningNumber() {
  return Math.floor(Math.random() * 100) + 1;
}
//shuffle function
function shuffle(arr) {
  var m = arr.length; //how many elements you have to shuffle
  //you will swap the card at index m - 1 with a randomly selected card, at index i
  var temp;
  var i;
  while (m) {
    i = Math.floor(Math.random() * m--); //pick from only the remaining elements, also deprecate m by 1 at the same time
    temp = arr[m]; //arr[m] is the last unshuffled element, store it in the variable temp;
    arr[m] = arr[i]; //reassign the randomly selected card to the front of the shuffled section of the array
    arr[i] = temp; //and assign the other card to the spot where the randome card was taken from
  }
  return arr;
}
//constructor function for a new game instance.
function Game() {
  this.playersGuess = undefined;
  this.pastGuesses = [];
  this.winningNumber = generateWinningNumber(); //winningNumber is a property that is assigned to the return value of generateWinningNumber()
}
//calculate difference
Game.prototype.difference = function() {
  return Math.abs(this.playersGuess - this.winningNumber);
};
//message
//clean this up, I think it would be easier to have variable for each case and then craft the messages and what happens later
Game.prototype.isLower = function() {
  if (this.playersGuess < this.winningNumber) {
    return 'Guess higher';
  } else if (this.playersGuess > this.winningNumber) {
    return 'Guess lower';
  }
};
//need to handle the error
Game.prototype.playersGuessSubmission = function() {
  // throws an error if the number is invalid (less than 1, greater than 100, or not a number)(what if it is not an integer?)
  var num = this.playersGuess;
  if (num > 100 || num < 1 || isNaN(num)) {
    throw 'That is an invalid guess.';
  }
  // takes a number as an argument and sets that as playersGuess
  return this.checkGuess();
};

Game.prototype.checkGuess = function() {
  if (this.playersGuess === this.winningNumber) {
    return 'win';
  }
  if (this.pastGuesses.includes(this.playersGuess)) {
    return 'duplicate';
  } else {
    this.pastGuesses.push(this.playersGuess);
  }
  if (this.pastGuesses.length > 4) {
    return 'lose';
  }
  if (this.difference() < 10) {
    //dry this code up and move it
    return 'burning';
  } else if (this.difference() < 25) {
    return 'warm';
  } else if (this.difference() < 50) {
    return 'chilly';
  } else {
    return 'ice';
  }
};

function newGame() {
  //is there a way to do this more succinctly so it simply resets?
  $('h1').text('The Guessing Game');
  $('h2').text('Guess a number between 1 and 100');
  $('h3').text('');
  $('li').text('-');
  $('body')
    .removeClass()
    .addClass('start container-fluid');
  $('#hint, #submit').prop('disabled', false);
  game = new Game();
}
//wish list: more interesting hints that are more like clues
Game.prototype.provideHint = function() {
  var hintArray = [];
  hintArray.push(this.winningNumber);
  hintArray.push(generateWinningNumber());
  hintArray.push(generateWinningNumber()); //repeating, but not sure how to do this shorter, since ony two
  shuffle(hintArray);
  return hintArray;
};
//this function displays past guesses after each guess
Game.prototype.guessDisplay = function() {
  var guesses = this.pastGuesses;
  //nth-child starts at 1, so start the counter at 1
  for (var i = 1; i <= guesses.length; i++) {
    $('#guesses li:nth-child(' + i + ')').text(guesses[i - 1]);
  }
};
var messages = {
  reset: 'Click reset to play again.',
  burning: "You're burning up!",
  warm: "You're warm.",
  win: 'You Win!',
  duplicate: 'You have already guessed that number.',
  lose: 'Sorry, you lose',
  ice: "You're ice cold!",
  chilly: "You're a bit chilly.",
};

Game.prototype.handleGuess = function() {
  var numberMessage = 'The number is ' + this.winningNumber;
  // $('#wrapper').removeClass().addClass('burning container-fluid')
  this.playersGuess = +$('#player-input').val();
  var outcome = this.playersGuessSubmission();
  $('h1').text(messages[outcome]);
  $('body')
    .removeClass()
    .addClass('container-fluid')
    .addClass(outcome);
  if (outcome === 'win' || outcome === 'lose') {
    $('h2').text('The number is ' + this.winningNumber);
    $('h3').text('Click reset to play again');
    $('#hint, #submit').prop('disabled', true);
  } else {
    $('h2').text(this.isLower());
  }
  $('#player-input').val(null);
  this.guessDisplay();
};

//event handlers
$(document).ready(function() {
  newGame();
  $('#submit').click(function() {
    game.handleGuess();
  });
  $('#main').keydown(function() {
    //check that it was enter clicked
    if (event.which === 13) {
      game.handleGuess();
    }
  });
  $('#new').click(function() {
    newGame();
  });

  $('#hint').click(function() {
    $('h2').text('The number is one of ' + game.provideHint().join(', '));
  });
});
//finish assignment
//refractor code
