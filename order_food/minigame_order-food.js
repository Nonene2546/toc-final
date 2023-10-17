var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = []
var level = 0
var started = false

function redirectToResultPage() {
    document.getElementById('transition-container').style.animation = 'sliding-left-in 1s forwards'
    setTimeout(function(){
        window.location.href = '../bread/choose_bread.html';
    }, 1000)
}

function nextSequence() {
    if (level !== 5){
        setTimeout(() => {
            userClickedPattern = []
            level++;
            $("#level-title").text("level " + level)
            var randomNumber = Math.floor(Math.random() * 4);
            var randomChosenColour = buttonColours[randomNumber];
            gamePattern.push(randomChosenColour);
            $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
            }, 1000);
    } else {
        win()
    }
}


// User clicks
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length - 1)
})

// Button animations
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed")
    }, 200)
}

// Start the game
$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level)
        nextSequence()
        started = true
    }
})

$(document).click(function () {
    if (!started) {
        $("#level-title").text("Level " + level)
        nextSequence()
        started = true
    }
})

// Check answer
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success")
        if (userClickedPattern.length === gamePattern.length) {
            nextSequence()
        }
    }
    else if (level !== 5) {
        console.log("wrong")
        $("body").addClass("game-over")
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200)
        $("#level-title").text("Game Over, Press Any Key to Restart")
        startOver()
    }
}

// Start over
function startOver() {
    level = 0
    gamePattern = []
    started = false
}

function win() {
    $("#level-title").text("You win")
    setTimeout(() => {
        redirectToResultPage()
    }, 1000);
}