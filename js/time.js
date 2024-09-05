'use-strict'

var startTime; // to keep track of the start time
var stopwatchInterval; // to keep track of the interval
var elapsedPausedTime = 0; // to keep track of the elapsed time while stopped

function startStopwatch() {
    if (!stopwatchInterval) {
        startTime = new Date().getTime() - elapsedPausedTime; // get the starting time by subtracting the elapsed paused time from the current time
        stopwatchInterval = setInterval(updateStopwatch, 1000); // update every second
    }
}

function stopStopwatch() {
    clearInterval(stopwatchInterval); // stop the interval
    elapsedPausedTime = new Date().getTime() - startTime; // calculate elapsed paused time
    stopwatchInterval = null; // reset the interval variable
}

function resetStopwatch() {
    stopStopwatch(); // stop the interval
    elapsedPausedTime = 0; // reset the elapsed paused time variable
    document.getElementById("stopwatch").innerHTML = "00:00:00"; // reset the display
}