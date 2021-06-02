import { SNAKE_SPEED, update as updateSnake, draw as drawSnake } from './snake.js'

const gameBoard = document.getElementById('game-board')
let lastRenderTime = 0

function main(currentTime) {
    // always request a new frame
    window.requestAnimationFrame(main)

    // stop if secondsSinceLastRender is less than threshold
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

    // otherwise render stuff
    console.log("render")
    update()
    draw()

    // and update lastRenderTime
    lastRenderTime = currentTime
}
window.requestAnimationFrame(main) // kickstart the recursive animation

function update() {
    updateSnake()
}

function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
}