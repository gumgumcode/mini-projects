
/**
 * TODO: 
 * 
 * 1. Basic start/stop/reset pomodoro
 * 2. Sound alert
 * 3. Log entry of each start and stop time.
 * 4. Short and long break
 * 
 * */ 


// Selectors

let btn_start = document.querySelector('.btn_start');
let btn_stop = document.querySelector('.btn_stop');
let btn_reset = document.querySelector('.btn_reset');
let timer_mins = document.querySelector('.timer_mins');
let timer_secs = document.querySelector('.timer_secs');

// Intervals

let secondsInterval = null;
let audioInterval = null;

// Flags

let isPaused = null;
let freshStart = null;

// Default Time Config

let mins = null;
let totalCountdownSeconds = null;

// Audio
let audio1 = new Audio('audio/beep.mp3');
let audio2 = new Audio('audio/aircraft-alert.wav');
let audio3 = new Audio('audio/fanfare-trumpets.mp3')

// Event Listeners

btn_start.addEventListener('click', function() {
    isPaused = 0;
    if (!secondsInterval) {
        secondsInterval = setInterval(updateTheTime, 1000);
    }
});

btn_stop.addEventListener('click', function() {
    clearInterval(secondsInterval);
    secondsInterval = null;
});

btn_reset.addEventListener('click', appInit);

// Core Functions

function appInit() {
    mins = 25;
    totalCountdownSeconds = mins * 60;
    isPaused = 0;
    freshStart = 1;
    updateTimeOutput();
    clearInterval(secondsInterval);
    secondsInterval = null;
}

function updateTimeOutput() {
    timer_mins.textContent = zeroPaddingCheck(mins);
    timer_secs.textContent = zeroPaddingCheck(totalCountdownSeconds%60);

    // console.log(mins, totalCountdownSeconds%60);
}

function zeroPaddingCheck(num) {
    return num < 10 ? "0"+num : num;
}

function updateTheTime() {

    if (freshStart) {
        mins = mins-1;
        freshStart=0;
    }

    if (isPaused) {
        return;
    }

    if (mins === 0 && totalCountdownSeconds === 0) {
        timerCompleteAlert();
        clearInterval(secondsInterval);
        secondsInterval = null;
        return;
    }

    totalCountdownSeconds--;
    if (totalCountdownSeconds%60 === 0 && mins>0) {
        mins--;
    }

    updateTimeOutput();
}

function timerCompleteAlert() {
    audio2.play();
}

// Initialize the app
appInit();