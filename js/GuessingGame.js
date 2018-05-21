function generateWinningNumber(){
  return Math.floor((Math.random()*100))+1;
}

function shuffle(arr){
  var m = arr.length;//how many elements you have to shuffle
  //you will swap the card at index m - 1 with a randomly selected card, at index i
  var temp;
  var i;
  while(m){
    i = Math.floor(Math.random() * m--);//pick from only the remaining elements, also deprecate m by 1 at the same time
    temp = arr[m];//arr[m] is the last unshuffled element, store it in the variable temp;
    arr[m] = arr[i];//reassign the randomly selected card to the front of the shuffled section of the array
    arr[i] = temp; //and assign the other card to the spot where the randome card was taken from
  }
  return arr;
}
//constructor function for a new game instance.
function Game(){
  this.playersGuess = null;
  this.pastGuesses = [];
  this.winningNumber = generateWinningNumber();//winningNumber is a property that is assigned to the return value of generateWinningNumber()
}
Game.prototype.difference = function(){
  return Math.abs(this.playersGuess - this.winningNumber);
};
Game.prototype.isLower = function(){
   if (this.playersGuess < this.winningNumber) {
     return true
   }
   else return false;
}
Game.prototype.playersGuessSubmission = function (num){
    // throws an error if the number is invalid (less than 1, greater than 100, or not a number)(what if it is not an integer?)
    if(num>100 || num < 1 || isNaN(num)){
      throw "That is an invalid guess.";
    }
    // takes a number as an argument and sets that as playersGuess
    this.playersGuess = num;
    return this.checkGuess();
  }

Game.prototype.checkGuess = function(){
  if(this.playersGuess === this.winningNumber){
    return "You Win!";
  }
  if(this.pastGuesses.includes(this.playersGuess)) {
    return "You have already guessed that number.";
  }
  else {
    this.pastGuesses.push(this.playersGuess)
  }
  if (this.pastGuesses.length>4){
    return "You Lose.";
  }
  if (this.difference()<10){
    return "You\'re burning up!";
  }
  else if (this.difference()<25){
    return "You\'re lukewarm.";
  }
  else if (this.difference()<50){
    return "You\'re a bit chilly.";
  }
  else {
    return "You\'re ice cold!";
  }
}

function newGame(){
  return new Game();
}

Game.prototype.provideHint = function(){
  var hintArray = [];
  hintArray.push(this.winningNumber);
  hintArray.push(generateWinningNumber());
  hintArray.push(generateWinningNumber()); //repeating, but not sure how to do this shorter, since ony two
  shuffle(hintArray);
  return hintArray;
}

$(document).ready(function() {
  var game = new Game();
  $('#submit').click(function(){
    var playerGuess = $('#player-input').val();
    $('#player-input').
  });
});
// After the player has submitted their guess, clear the input element.
