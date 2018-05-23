var  game;
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
  this.playersGuess = undefined;
  this.pastGuesses = [];
  this.winningNumber = generateWinningNumber();//winningNumber is a property that is assigned to the return value of generateWinningNumber()
}
Game.prototype.difference = function(){
  return Math.abs(this.playersGuess - this.winningNumber);
};
Game.prototype.isLower = function(){
   if (this.playersGuess < this.winningNumber) {
     return "Guess higher"
   }
   else if (this.playersGuess >this.winningNumber){
     return "Guess lower";
   }
   else {
     return "The number is " + this.winningNumber + ' click reset to play again'
   }
}
Game.prototype.playersGuessSubmission = function(){
    // throws an error if the number is invalid (less than 1, greater than 100, or not a number)(what if it is not an integer?)
    var num = this.playersGuess;
    if(num > 100 || num < 1 || isNaN(num)){
      throw "That is an invalid guess.";
    }
    // takes a number as an argument and sets that as playersGuess
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
    return "You Lose";
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
  $('h1').text('The Guessing Game');
  $('h2').text('Guess a number between 1 and 100');
  $('li').text('-');
  return game = new Game();
}

Game.prototype.provideHint = function(){
  var hintArray = [];
  hintArray.push(this.winningNumber);
  hintArray.push(generateWinningNumber());
  hintArray.push(generateWinningNumber()); //repeating, but not sure how to do this shorter, since ony two
  shuffle(hintArray);
  return hintArray;
}
//this function displays past guesses after each guess
 Game.prototype.guessDisplay = function(){
   var guesses = this.pastGuesses;
   //nth-child starts at 1, so start the counter at 1
  for(var i = 1; i <= guesses.length; i++){
       $('#guesses li:nth-child('+ i + ')').text(guesses[i-1]);
   }
}

function handleGuess(game){
  game.playersGuess = +$('#player-input').val();
  var output = game.playersGuessSubmission();
  $('h1').text(output);
  if(output === "You Lose"){
    $('h2').text("The number is " + game.winningNumber + ". Click reset to play again");
  }
  //dry up this code some.
  //need to handle when someone enters something that is not a number and it throws an error
  else{
    $('h2').text(game.isLower());
  }
  $('#player-input').val(null);
  game.guessDisplay();
}


$(document).ready(function() {
  newGame();
  $('#submit').click(function(){
    handleGuess(game);
  });
  $('#main').keydown(function(){
    //check that it was enter clicked
    if(event.which===13){
      handleGuess(game);
    }
  });
  $('#new').click(function(){
       newGame();
  });

  $('#hint').click(function(){
      $('h2').text('The number is one of ' + game.provideHint().join(", "));
  });
});
//finish assignment
//refractor code
//add in backgrounds that transition
