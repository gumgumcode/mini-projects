import { draw as drawPiece, update as updatePiece } from "./pieces.js"
import { draw as drawBlock, update as updateBlock } from "./blocks.js"
import { updateGridSize } from "./grid.js"

let lastRenderTime = 0
let game_speed = 10
let game_over = 0
const gameBoard = document.getElementById('game-board')


function main(currentTime) {
    if (game_over) {
        console.log('game over')
        return
    }
    window.requestAnimationFrame(main)

    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / game_speed) return

    update()
    draw()

    lastRenderTime = currentTime
}


function update() {
    updatePiece()
    updateBlock()
}

function draw() {
    gameBoard.innerHTML = ''
    drawPiece(gameBoard)
    drawBlock(gameBoard)
}

function init() {
    updateGridSize(gameBoard)
    window.requestAnimationFrame(main)
}

export function setGameOver(val) {
    game_over = val
}

init()