/*jshint esversion: 6 */

var buttonColours = ["red", "blue", "green", "yellow"];
var soundsFiles = {
	red: new Audio("sounds/red.mp3"),
	blue: new Audio("sounds/blue.mp3"),
	green: new Audio("sounds/green.mp3"),
	yellow: new Audio("sounds/yellow.mp3"),
	defeat: new Audio("sounds/wrong.mp3"),
};
var gamePattern = [];
var userClickedPattern = [];
var randomChosenColour;
var userChosenColour;
var isGameRunning = false;
var level = 0;

$(".btn").click(function () {
	if (isGameRunning) {
		userChosenColour = this.id;
		userClickedPattern.push(userChosenColour);
		playSong(userChosenColour);
		animatePress(userChosenColour);
		checkAnswer(userClickedPattern.length - 1);
	}
});

$(document).keypress(function (e) {
	if (!isGameRunning) {
		nextSequence();
		$("h1").text("Level " + level);
		isGameRunning = true;
	}
});

function nextSequence() {
	userClickedPattern = [];
	var randomNumber = Math.floor(Math.random() * 4);
	randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);
	playSong(randomChosenColour);
	$(`#${randomChosenColour}`)
		.fadeOut(100)
		.fadeIn(100)
		.fadeOut(100)
		.fadeIn(100);
	level++;
	$("h1").text("Level " + level);
}

function startOver() {
	level = 0;
	gamePattern = [];
	isGameRunning = false;
}

function playSong(soundToPlay) {
	var song = soundsFiles[soundToPlay].play();
	if (song !== undefined) {
		song
			.then((_) => {
				song.play();
			})
			.catch((error) => {});
	}
}

function animatePress(currentColor) {
	$(`#${currentColor}`).addClass("pressed");
	setTimeout(function () {
		$(`#${currentColor}`).removeClass("pressed");
	}, 100);
}

function checkAnswer(answer) {
	if (userClickedPattern[answer] === gamePattern[answer]) {
		if (userClickedPattern.length === gamePattern.length) {
			setTimeout(function () {
				nextSequence();
			}, 1000);
		}
	} else {
		$("h1").text("Game Over, Press Any Key to Restart");
		playSong("defeat");
		$("body").addClass("game-over");
		setTimeout(function () {
			$("body").removeClass("game-over");
		}, 200);
		startOver();
	}
}
