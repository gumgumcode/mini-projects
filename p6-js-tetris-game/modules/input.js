let inputDirection = { x: 0, y: 1 }

window.addEventListener("keydown", (e) => {
    switch(e.key) {
        case "ArrowLeft":
            inputDirection = { x: -1, y: 0 }
            break
        case "ArrowRight":
            inputDirection = { x: 1, y: 0 }
            break
        case "ArrowDown":
            inputDirection = { x: 0, y: 1 }
            break
        case "ArrowUp":
            inputDirection = { x: 0, y: -1 }
            break
    }
})

export function getInputDirection() {
    return inputDirection
}

export function resetInputDirection() {
    inputDirection = { x: 0, y: 1 }
}