// const blocks = []
const blocks = [
    { x: 0, y: 24 },
    { x: 1, y: 24 },
    { x: 2, y: 24 },
    { x: 3, y: 24 },
    { x: 4, y: 24 },
    { x: 5, y: 24 },
    { x: 6, y: 24 },
    { x: 7, y: 24 },
    { x: 8, y: 24 },
    { x: 9, y: 24 },
    { x: 10, y: 24 },
    { x: 11, y: 24 },
]
// const topblocks = []

export function update() {
    checkRows()
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

function emptyTheRow(y) {
    blocks.forEach(b => {
        if (b.y == y) {
            b.x = 25
            b.y = 25
        }
    })
}

function checkRows() {
    // go through each row
    for(let row = 24; row>=0; row--) {

        let count = 0
        blocks.forEach(b => {
            if (b.y === row) {
                count+=1
            }
        })
        
        // if every segment in row is filled
        if (count >= 12) {
            // empty that row
            emptyTheRow(row)
        }
    }
}