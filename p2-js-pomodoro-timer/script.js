
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

// Core

let secondInterval = 0;
let isPaused = 0;

// Default Time Config

let mins = 2;
let totalCountdownSeconds = mins * 60;

// Event Listeners

btn_start.addEventListener('click', function() {
    isPaused = 0;
    secondInterval = setInterval(updateTheTime, 100);
});

btn_stop.addEventListener('click', function() {
    clearInterval(secondInterval);
});

btn_reset.addEventListener('click', function(){
    mins = 25;
    totalCountdownSeconds = mins * 60;
    updateTimeOutput();
})

// Core Functions

function updateTimeOutput() {
    timer_mins.textContent = zeroPaddingCheck(mins);
    timer_secs.textContent = zeroPaddingCheck(totalCountdownSeconds%60);

    console.log(mins, totalCountdownSeconds%60);
}

function zeroPaddingCheck(num) {
    return num < 10 ? "0"+num : num;
}

function updateTheTime() {

    if (isPaused) {
        return;
    }

    if (mins === 0 && totalCountdownSeconds === 0) {
        clearInterval(secondInterval);
        return;
    }

    totalCountdownSeconds--;
    if (totalCountdownSeconds%60 === 0 && mins>0) {
        mins--;
    }

    updateTimeOutput();
}