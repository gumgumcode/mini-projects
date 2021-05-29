'use strict';

// Options
let secret_number = 0;
let score = 0;
let highscore = 0;
let game_over = 0;

// Selectors
let guess_box = document.querySelector('.guess');
let body = document.querySelector('body');
let number_box = document.querySelector('.number');
let score_output = document.querySelector('.score');
let highscore_output = document.querySelector('.highscore');
let check_button = document.querySelector('.check');

// Event Listeners
document.querySelector('.check').addEventListener('click', checkGuess);
document.querySelector('.reset').addEventListener('click', reset);

function checkGuess() {

    // Gameover? Reset the game!
    if (game_over === 1) {
        gameSetup();
        return;
    }

    // Guess Value
    let guess = Number(guess_box.value);

    // Empty Guess
    if (!guess) {
        setMessage('✋ Enter a number!');

        // Guess matches: WIN
    } else if (guess === secret_number) {
        setMessage('✅ Correct Guess!');
        game_over = 1;
        check_button.textContent = 'Play again!';
        guess_box.disabled = true;
        body.style.backgroundColor = '#60b347';
        number_box.textContent = guess;
        highscore = score > highscore ? score : highscore;
        highscore_output.textContent = highscore;

        // Guess doesn't match 
    } else {
        if (score > 0) {
            setMessage((guess > secret_number) ? '🔼 Too High!' : '⬇️ Too Low!');
            reduceScore();
        }
    }
}

function setMessage(message) {
    document.querySelector('.message').textContent = message;
}

function reduceScore() {
    if (score <= 0) {
        return;
    }
    
    score--;
    document.querySelector('.score').textContent = score;

    // Game Over!
    if (score < 1) {
        setMessage('😫 Game over!');
        game_over = 1;
        check_button.textContent = 'Play again!';
        guess_box.disabled = true;
        body.style.backgroundColor = '#B22222';
    }
}

function gameSetup() {
    // Options
    secret_number = Math.trunc(Math.random()*20) + 1;
    score = 20;
    game_over = 0;

    // Reset Output Text
    body.style.backgroundColor = '#222';
    check_button.textContent = 'Check!';
    number_box.textContent = '?';
    score_output.textContent = score;
    setMessage('Start guessing!');

    // Reset Input Boxes
    guess_box.disabled = false;
    guess_box.value = '';
    guess_box.focus();
}

function reset() {
    gameSetup();

    // Reset the highscore
    highscore = 0;
    highscore_output.textContent = highscore;
}

// Initialize the game
gameSetup();