
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

/*  detect when any of the buttons are clicked*/
$(".btn").click(function (e) {
    /* var userChosenColour = e.target.id; */ /* same as var userChosenColour =  $(this).attr("id");*/
    var userChosenColour = $(this).attr("id");

    /* console.log(userChosenColour); */
    userClickedPattern.push(userChosenColour);

    /* play sound */
    playSound(userChosenColour);
    /* animate color */
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});


/* detect when a keyboard key has been pressed. */
$(document).on('keypress', function (e) {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});
/* detect when a play button been pressed. */
$(".mobPlay").on('touchstart', function (e) {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function nextSequence() {
    userClickedPattern = [];

    /* change level title */
    $("#level-title").text("Level " + level);
    level++;


    var randomNumber = Math.round(Math.random() * 3); /* Generate a random number 0-3 */
    var randomChosenColour = buttonColours[randomNumber];/* save the randomNumber as a position of array */
    gamePattern.push(randomChosenColour); /* insert the randomChosenColour at the new array game pattern */

    /* Selecting the same id of randomNumber by datas array providing */
    var selectId = ("#" + randomChosenColour);

    /* Animate a flsh to buttom select */
    $(selectId).fadeOut(100).fadeIn(100);

    /* play sound */
    playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
/* Start again from 0 */
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

/* play sound function*/
function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

/* Animation color after click */
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

