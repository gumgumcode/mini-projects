// IMPORTS

import { GRID_HEIGHT, GRID_WIDTH, outOfGrid } from "./grid.js"
import { onBlock, setBlocks } from "./blocks.js"
import { getInputDirection, resetInputDirection } from "./input.js"

// CONSTANTS

const squarePiece = [
    { x: 1, y: 1 },
    { x: 1, y: 2 },
    { x: 2, y: 1 },
    { x: 2, y: 2 }
]
const linePiece = [
    { x: 1, y: 1 },
    { x: 1, y: 2 },
    { x: 1, y: 3 },
    { x: 1, y: 4 }
]
const pieces = [squarePiece, linePiece]

// SETUP

let currentPiece = []
setRandomCurrentPiece()

// UPDATE AND DRAW

export function update() {

    // create a temporary piece
    let nextPos = []
    currentPiece.forEach((segment, index) => {
        nextPos.push({ ...currentPiece[index] })
    })

    // move nextPos (down/left/right) ---------------------
    const inputDirection = getInputDirection()

    // move down
    for (let i = nextPos.length - 1; i >= 0; i--) {   
        nextPos[i].x += inputDirection.x
        nextPos[i].y += inputDirection.y
    }
    resetInputDirection()
    // move end -------------------------------------------

    // stop if nextPos out of grid or if nextPos on block
    if (outOfGrid(nextPos) || onBlock(nextPos)) {

        // update block if move direction is downward
        if (inputDirection.y > 0) {
            setBlocks(currentPiece)
            setRandomCurrentPiece()
        }

        return
    }

    // otherwise move currentPiece to nextPos
    for (let i = currentPiece.length - 1; i >= 0; i--) {   
        currentPiece[i].x = nextPos[i].x
        currentPiece[i].y = nextPos[i].y
    }

}

export function draw(gameBoard) {
    currentPiece.forEach((segment, index) => {
        const pieceElement = document.createElement('div')
        pieceElement.style.gridRowStart = segment.y
        pieceElement.style.gridColumnStart = segment.x
        pieceElement.classList.add('piece')
        gameBoard.appendChild(pieceElement)
    })
}

// FUNCTIONS

function setRandomCurrentPiece() {
    let randomVal = Math.floor(Math.random() * 2) // between 0 and 1
    let piece = pieces[randomVal]
    currentPiece = []

    piece.forEach((segment, index) => {
        currentPiece.push({ ...piece[index] })
    })
}
