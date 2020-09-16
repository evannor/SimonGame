var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;

// Start the game when any keyboard button is pressed
$(document).keypress(function(){
  nextSequence();
});

function nextSequence() {
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
  level++;
}

// detect when any of the buttons are clicked and trigger a handler function
$(".btn").click(function(event){
  // Create var to store the id of the button clicked
  var userChosenColor = event.target.id;
  // Add the newly clicked button to user array
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
});

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
