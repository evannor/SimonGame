var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
// keep track whether game has started or not
var started = false;

// detect when any of the buttons are clicked and trigger a handler function
$(".btn").click(function(event){
  // Create var to store the id of the button clicked
  var userChosenColor = event.target.id;
  // Add the newly clicked button to user array
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer((userClickedPattern.length - 1));
});

// Start the game when any keyboard button is pressed
$(document).keydown(function(){
  if (!started) {
    // Change the h1 each time nextSequence is called
    $("#level-title").text("Level: " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  level++;
  // Change the h1 each time nextSequence is called
  $("#level-title").text("Level: " + level);
  // Create random number 0 - 3
  var randomNumber = Math.round(Math.random() * 3);
  // Use random number to choose a color in buttonColors array
  var randomChosenColor = buttonColors[randomNumber];
  // Add this color to the gamePattern array
  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);
  animatePress(randomChosenColor);
}

// Function to be called every time a button lights up
function playSound(name){
  var playSound = new Audio ("sounds/" + name + ".mp3");
  playSound.play();
}

// Add the pressed class when a button is pressed, and then removes it
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Checks player array vs game array
function checkAnswer(currentLevel) {
  // Checks to see if the entries as the same index are the same value
  if (userClickedPattern[currentLevel] === gamePattern [currentLevel]) {
    // Confirms that the player has finished
    if (userClickedPattern.length === gamePattern.length) {
      // Delays the execution of function by 1000 milliseconds
      setTimeout(nextSequence, 1000);
      // Resets user pattern
      userClickedPattern = [];
    }
  } else {
    var wrongAnswerSound = new Audio ("sounds/wrong.mp3");
    wrongAnswerSound.play();
    // temporarily adds the game-over class if the user pattern does not match
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("GAME OVER. Press any button to restart.");
    startOver();
  }
}

function startOver () {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
