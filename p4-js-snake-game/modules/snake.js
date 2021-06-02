import { getInputDirection } from "./input.js"

// Snake speed = (updates to snake) per (second)
export const SNAKE_SPEED = 5
const snakeBody = [{ x: 11, y: 11 }]
let newSegments = 0
let snakeHeadColor

export function update() {

    // add new segments if any
    addSegments()

    // starting with last segment, 
    // move every single segment to the previous segment's position,
    // except the head (0th) segment. 
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] }
        console.log(snakeBody)
    }
    
    // find new position for head (0th) segment 
    const inputDirection = getInputDirection()
    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
}

export function draw(gameBoard) {
    // draw every single segment of the snake's body
    snakeBody.forEach((segment, index) => {
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = segment.y
        snakeElement.style.gridColumnStart = segment.x
        snakeElement.classList.add('snake')
        if ((index === 0) && (typeof snakeHeadColor !== undefined)) {
            snakeElement.style.backgroundColor = snakeHeadColor
        }
        gameBoard.appendChild(snakeElement)
    })
}

export function expandSnake(amount) {
    newSegments += amount
}

export function onSnake(position, { ignoreHead = false } = {}) {
    // some() returns true if any of the segments pass the test
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) return false
        return equalPositions(segment, position)
    })
}

export function getSnakeHead() {
    return snakeBody[0]
}

export function snakeIntersection() {
    return onSnake(snakeBody[0], { ignoreHead : true })
}

function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments() {
    // keep adding a segment to the tail of snake's body
    for(let i=0; i < newSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1]})
    }

    // reset new segments to zero after adding them to the snake's body
    newSegments = 0
}