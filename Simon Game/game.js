var buttonColours = ["red", "blue", "green", "yellow"];
var gamepattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

//generates randomNumber,selcted color adds to gamepattern ,and bot chooses the random color,button flickers
function nextSequence() {
  level++;
  userClickedPattern = [];
  document.querySelector("h1").textContent = "Level " + level;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColours[randomNumber];
  gamepattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
  console.log(gamepattern);
}

//listens to the buttons,adds the user-selcted button color to userClickedPattern,plays sound = color
$(".btn").click(function () {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  console.log(userClickedPattern);
  checkAnswer();
});

function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  var thatbutton = document.getElementById(currentColor);
  thatbutton.classList.add("pressed");
  setTimeout(function () {
    thatbutton.classList.remove("pressed");
  }, 100);
}

document.addEventListener("keypress", function () {
  if (!started) {
    document.querySelector("h1").textContent = "Level " + level;
    nextSequence();
    started = true;
  }
});
function howToPlay() {
  alert(
    "the game starts after you keypress a button, you have to follow the flashing buttons and remember the sequence in which it was flashed "
  );
}

function checkAnswer() {
  indexofuser = userClickedPattern.length - 1;
  if (userClickedPattern[indexofuser] == gamepattern[indexofuser]) {
    console.log("successss");

    if (userClickedPattern.length === gamepattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    $("h1").text("Game-over");
    document.querySelector("body").classList.add("game-over");
    setTimeout(() => {
      document.querySelector("body").classList.remove("game-over");
    }, 200);
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();
    setTimeout(() => {
      startOver();
    }, 1000);
  }
}

function startOver() {
  level = 0;
  gamepattern = [];
  userClickedPattern = [];
  started = false;
  $("h1").text("Press A Key to Start");
  alert("Start new game?");
}
