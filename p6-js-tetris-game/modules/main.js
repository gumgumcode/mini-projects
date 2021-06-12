import { draw as drawPiece, update as updatePiece } from "./pieces.js"
import { draw as drawBlock, update as updateBlock } from "./blocks.js"
import { updateGridSize } from "./grid.js"

let lastRenderTime = 0
let GAME_SPEED = 10
const gameBoard = document.getElementById('game-board')


function main(currentTime) {
    window.requestAnimationFrame(main)

    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / GAME_SPEED) return

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

init()