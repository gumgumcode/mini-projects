const blocks = []
// const topblocks = []

export function update() {

}

export function draw(gameBoard) {
    blocks.forEach((segment, index) => {
        const pieceElement = document.createElement('div')
        pieceElement.style.gridRowStart = segment.y
        pieceElement.style.gridColumnStart = segment.x
        pieceElement.classList.add('piece')
        gameBoard.appendChild(pieceElement)
    })
}

export function setBlocks(currentPiece) {
    currentPiece.forEach((segment, index) => {
        blocks.push({ ...segment })
    })
}

function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y
}

export function onBlock(piece) {
    return blocks.some(b => {
        return piece.some(p => {
            return equalPositions(b, p)
        })
    })
}