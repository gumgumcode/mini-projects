import { SNAKE_SPEED, update as updateSnake, draw as drawSnake, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')

function main(currentTime) {
    if (gameOver) {
        if(confirm('You lost, press OK to restart!')) {
            window.location = '/'
        }
        return
    }

    // always request a new frame
    window.requestAnimationFrame(main)

    // stop if secondsSinceLastRender is less than threshold
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

    // otherwise render stuff
    update()
    draw()

    // and update lastRenderTime
    lastRenderTime = currentTime
}
window.requestAnimationFrame(main) // kickstart the recursive animation

function update() {
    updateSnake()
    updateFood()
    checkDeath()
}

function draw() {
    if (gameOver) return
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}