
var randomNumber = 0;
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var levelMsg = "Level ";
var temp = "";


var randomChosenColour = null;

function nextSequence() {
    level++;
    temp = levelMsg + level;
    $("h1").text(temp);

    randomNumber = Math.random() * 4;
    randomNumber = Math.floor(randomNumber);
    randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    // console.log("The current sequence is: " + gamePattern);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".btn").click(function() {
    // console.log("The userChosenColour is: " + $(this).attr("id"));
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log("The userClickedPattern is: " + userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    // checkAnswer(level);
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


$(document).keypress(function() {
    if (level === 0) {
        temp = levelMsg + level;
        $("h1").text(temp);
        nextSequence();
    } 
});

function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        }
    }
    else {
        console.log("Wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
}
