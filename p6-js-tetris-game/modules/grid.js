

export const GRID_HEIGHT = 24
export const GRID_WIDTH = Math.round(GRID_HEIGHT / 2)

export function updateGridSize(gameBoard) {
    gameBoard.style.gridTemplateRows =  `repeat(${GRID_HEIGHT}, 1fr)`
    gameBoard.style.gridTemplateColumns =  `repeat(${GRID_WIDTH}, 1fr)`
}

export function outOfGrid(piece) {
    for (let i = piece.length - 1; i >= 0; i--) {
        if (piece[i].x <= 0 || piece[i].x > GRID_WIDTH || piece[i].y <= 0 || piece[i].y > GRID_HEIGHT) {
            return true
        }
    }
    return false
}