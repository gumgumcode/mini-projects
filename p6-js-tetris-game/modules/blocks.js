const blocks = []

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

function checkRows() {
    // go through each row
    for(let row = 24; row>=1; row--) {

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
            stepDownBlocks(row)
        }
    }
}

function emptyTheRow(y) {
    blocks.forEach((b, index, object) => {
        if (b.y === y) {
            // object.splice(index, 1)
            b.y = 30
        }
    })
}

function stepDownBlocks(row) {
    // if block is above deleted row, move it down
    blocks.forEach(b => {
        if (b.y < row) {
            b.y += 1
        }
    })
}