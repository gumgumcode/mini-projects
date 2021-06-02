let inputDirection = { x: 0, y: 0 }
let lastInputDirection = { x: 0, y: 0 }

window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
            // if we are already going up or down, ignore the input
            if (lastInputDirection.y !== 0) break
            inputDirection = { x: 0, y: -1 }
            break
        case "ArrowDown":
            // if we are already going up or down, ignore the input
            if (lastInputDirection.y !== 0) break
            inputDirection = { x: 0, y: 1 }
            break
        case "ArrowRight":
            // if we are already going left or right, ignore the input
            if (lastInputDirection.x !== 0) break
            inputDirection = { x: 1, y: 0 }
            break
        case "ArrowLeft":
            // if we are already going left or right, ignore the input
            if (lastInputDirection.x !== 0) break
            inputDirection = { x: -1, y: 0 }
            break
    }
});

export function getInputDirection() {
    lastInputDirection = inputDirection
    return inputDirection
}
