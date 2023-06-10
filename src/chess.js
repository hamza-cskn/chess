const squares = [
    ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'],
    ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'],
    ['a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6'],
    ['a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5'],
    ['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4'],
    ['a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3'],
    ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
    ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1']
]

const whitePieceUnicodes = new Map()
whitePieceUnicodes.set('King', '♔')
whitePieceUnicodes.set('Queen', '♕')
whitePieceUnicodes.set('Bishop', '♗')
whitePieceUnicodes.set('Knight', '♘')
whitePieceUnicodes.set('Rook', '♖')
whitePieceUnicodes.set('Pawn', '♙')

const blackPieceUnicodes = new Map()
blackPieceUnicodes.set('King', '♚')
blackPieceUnicodes.set('Queen', '♛')
blackPieceUnicodes.set('Bishop', '♝')
blackPieceUnicodes.set('Knight', '♞')
blackPieceUnicodes.set('Rook', '♜')
blackPieceUnicodes.set('Pawn', '♟')

const board = new Map()

// location and direction. direction is 1 for black pieces, -1 for white pieces.
const pawn = {
    name: 'Pawn',
    moveables: (loc, color) => {
        const dir = color === 'white' ? 1 : -1
        const result = []
        // en passant

        // forward
        let l = addVertical(loc, 1 * dir)
        if (isEmpty(l) && isInsideBoard(l)) result.push(l)

        if ((color === 'white' && loc.y === 2) || (color === 'black' && loc.y === 7)) {
            l = addVertical(loc, 2 * dir)
            if (isEmpty(l) && isInsideBoard(l)) result.push(l)
        }

        // crosses
        l = addLoc(loc, -1, 1 * dir)
        if (!isEmpty(l) && isInsideBoard(l) && !isColor(l, color)) result.push(l)

        l = addLoc(loc, 1, 1 * dir)
        if (!isEmpty(l) && isInsideBoard(l) && !isColor(l, color)) result.push(l)

        return result
    },
    attackable: (loc, color) => {
        const result = []
        const dir = color === 'white' ? 1 : -1
        // crosses
        let l = addLoc(loc, -1, 1 * dir)
        if (!isEmpty(l) && isInsideBoard(l) && !isColor(l, color)) result.push(l)

        l = addLoc(loc, 1, 1 * dir)
        if (!isEmpty(l) && isInsideBoard(l) && !isColor(l, color)) result.push(l)
        return result
    }
}

const queen = {
    name: 'Queen',
    moveables: (loc, color) => {
        const result = []
        result.push(...flatIteration(loc, color))
        result.push(...crossIteration(loc, color))
        return result
    },
    attackable: (loc, color) => queen.moveables(loc, color)
}
const rook = {
    name: 'Rook',
    moveables: (loc, color) => {
        return flatIteration(loc, color)
    },
    attackable: (loc, color) => rook.moveables(loc, color)
}
const bishop = {
    name: 'Bishop',
    moveables: (loc, color) => {
        return crossIteration(loc, color)
    },
    attackable: (loc, color) => bishop.moveables(loc, color)
}
const king = {
    name: 'King',
    // todo - castling
    moveables: (loc, color, ignoreThreatCheck) => {
        const result = []
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                if (x === 0 && y === 0) continue
                const l = addLoc(loc, x, y)
                if (!isInsideBoard(l)) continue
                const attackersOfl = ignoreThreatCheck ? [] : getAttackingPiecesLocations(l, color)
                if (attackersOfl.length === 0) {
                    pushIfAbleToMove(l, color, result)
                }
            }
        }
        return result
    },
    attackable: (loc, color, checkAttacking) => king.moveables(loc, color, checkAttacking)

}
const knight = {
    name: 'Knight',
    attackable: (loc, color) => {
        knight.moveables(loc, color)
    },
    moveables: (loc, color) => {
        const result = []
        pushIfAbleToMove(addLoc(loc, 1, 2), color, result)
        pushIfAbleToMove(addLoc(loc, 2, 1), color, result)

        pushIfAbleToMove(addLoc(loc, -1, -2), color, result)
        pushIfAbleToMove(addLoc(loc, -2, -1), color, result)

        pushIfAbleToMove(addLoc(loc, 1, -2), color, result)
        pushIfAbleToMove(addLoc(loc, 2, -1), color, result)

        pushIfAbleToMove(addLoc(loc, -1, 2), color, result)
        pushIfAbleToMove(addLoc(loc, -2, 1), color, result)
        return result
    }
}

const flatIteration = (loc, color) => {
    const result = []
    // vertical
    moveIteration(loc, color, result, (i) => i + 1, (i) => addVertical(loc, i))
    moveIteration(loc, color, result, (i) => i - 1, (i) => addVertical(loc, i))

    // horizontal
    moveIteration(loc, color, result, (i) => i + 1, (i) => addHorizontal(loc, i))
    moveIteration(loc, color, result, (i) => i - 1, (i) => addHorizontal(loc, i))
    return result
}

const crossIteration = (loc, color) => {
    const result = []
    moveIteration(loc, color, result, (i) => i - 1, (i) => addLoc(loc, i, i))
    moveIteration(loc, color, result, (i) => i + 1, (i) => addLoc(loc, i, i))

    moveIteration(loc, color, result, (i) => i - 1, (i) => addLoc(loc, i * -1, i))
    moveIteration(loc, color, result, (i) => i + 1, (i) => addLoc(loc, i * -1, i))
    return result
}

const moveIteration = (loc, color, result, each, nextLocation) => {
    let index = 0
    while (true) {
        index = each(index)
        loc = nextLocation(index)
        const shouldContinue = pushIfAbleToMove(loc, color, result)
        if (!shouldContinue) {
            break
        }
    }
}

const pushIfAbleToMove = (loc, color, array) => {
    if (isAbleToMove(loc, color)) {
        array.push(loc)
        return true
    }
    return false
}

const isAbleToMove = (loc, color) => {
    if (!isInsideBoard(loc)) { // if the iteration is reached the outside of checkerPiece, then stop.
        return false
    }

    if (isEmpty(loc)) { // if the iterating square is empty, then continue. otherwise stop.
        return true
    } else {
        if (isColor(loc, color)) { // a pieces cannot move to square of a same color pieces
            return false
        }
        return true
    }
}

const getAttackingPiecesLocations = (loc, color) => {
    const result = []
    board.forEach((v, k) => {
        if (v.color === color) return
        const l = squareToLocation(k)
        const attackables = v.piece.attackable(l, v.color, true)
        if (valueIncludes(attackables, loc)) {
            result.push(l)
        }
    })
    return result
}
const isInsideBoard = (loc) => loc && loc.x <= 8 && loc.y <= 8 && loc.x >= 1 && loc.y >= 1
const pieceAt = (loc) => board.get(locationToId(loc))
const putPiece = (loc, piece) => board.set(locationToId(loc), piece)
const removePiece = (loc) => board.delete(locationToId(loc))
const isEmpty = (loc) => pieceAt(loc) == null
const colorAt = (loc) => pieceAt(loc)?.color || null
const isColor = (loc, color) => colorAt(loc) === color
const normalizeNumber = (x) => {
    if (x === 0) return 0
    return x < 0 ? -1 : 1
}

const areOnSameCross = (l1, l2) => {
    const xDiff = l1.x - l2.x
    const yDiff = l1.y - l1.y
    if (xDiff === yDiff || xDiff === -yDiff) {
        return {x: normalizeNumber(xDiff), y: normalizeNumber(yDiff)} // returns which side of l1 is l2 on mathematically.
    }
}
const areOnSameFlat = (l1, l2) => {
    const xDiff = l1.x - l2.x
    const yDiff = l1.y - l1.y
    if (xDiff === 0 || yDiff === 0) {
        return {x: normalizeNumber(xDiff), y: normalizeNumber(yDiff)} // returns which side of l1 is l2 on mathematically.
    }
}
const areLinear = (l1, l2) => areOnSameCross(l1, l2) || areOnSameFlat(l1, l2)

const addVertical = (loc, count) => getLocationAt(loc.x, loc.y + count)
const addHorizontal = (loc, count) => getLocationAt(loc.x + count, loc.y)
const addLoc = (loc, xCount, yCount) => addVertical(addHorizontal(loc, xCount), yCount)

const locationToId = (loc) => locationToSquare(loc)
const squareToLocation = (square) => getLocationAt(('abcdefgh'.indexOf(square[0]) + 1), parseInt(square[1]))
const locationToSquare = (loc) => {
    if (!isInsideBoard(loc)) {
        return null
    }
    return 'abcdefgh'.charAt(loc.x - 1) + loc.y
}
const getLocationAt = (x, y) => ({x, y})

const createPiece = (loc, piece, color) => {
    board.set(locationToSquare(loc), {piece, color})
}

function setupDefaultBoard() {
    createPiece(squareToLocation('e1'), king, 'white')
    createPiece(squareToLocation('e8'), king, 'black')

    createPiece(squareToLocation('d1'), queen, 'white')
    createPiece(squareToLocation('d8'), queen, 'black')

    createPiece(squareToLocation('a1'), rook, 'white')
    createPiece(squareToLocation('h1'), rook, 'white')
    createPiece(squareToLocation('a8'), rook, 'black')
    createPiece(squareToLocation('h8'), rook, 'black')

    createPiece(squareToLocation('b1'), knight, 'white')
    createPiece(squareToLocation('g1'), knight, 'white')
    createPiece(squareToLocation('b8'), knight, 'black')
    createPiece(squareToLocation('g8'), knight, 'black')

    createPiece(squareToLocation('c1'), bishop, 'white')
    createPiece(squareToLocation('f1'), bishop, 'white')
    createPiece(squareToLocation('c8'), bishop, 'black')
    createPiece(squareToLocation('f8'), bishop, 'black')

    let l = squareToLocation('a2')
    for (let i = 0; i < 8; i++) {
        createPiece(l, pawn, 'white')
        l = addHorizontal(l, 1)
    }

    l = squareToLocation('a7')
    for (let i = 0; i < 8; i++) {
        createPiece(l, pawn, 'black')
        l = addHorizontal(l, 1)
    }
}

const isFinished = () => {
    const checkData = isCheck()
    if (checkData && king.moveables(checkData.loc, checkData.color)) {
        return checkData
    }
}

const isCheck = () => {
    board.forEach((v, k) => {
        if (v.piece.name === 'King') {
            const l = squareToLocation(k)
            const threats = getAttackingPiecesLocations(l, v.color)
            if (threats.length !== 0) {
                return {color: v.color, king: v, loc: l}
            }
        }
    })
}

function getFormattedSquareAt(loc, movableSquares) {
    let backgroundColor = getSquareBackgroundColor(loc)
    const foregroundColor = getSquareForegroundColor(loc)
    const content = ' ' + getSquareTextAt(loc)

    if (movableSquares && valueIncludes(movableSquares, loc)) {
        backgroundColor = '\x1b[42m'
    }

    return backgroundColor + foregroundColor + content + '\x1b[0m' /* reset */
}

function getSquareBackgroundColor(loc) {
    if (loc.y % 2 !== 0 ^ loc.x % 2 !== 0) // xor
    {
        return '\x1b[48;5;240m'
    } // black
    else {
        return '\x1b[48;5;15m'
    } // white
}

function getSquareForegroundColor(loc) {
    const piece = pieceAt(loc)
    if (piece) {
        if (piece.color === 'white') {
            return '\x1b[36m'
        } else {
            return '\x1b[34m'
        }
    } else {
        if (loc.y % 2 !== 0 ^ loc.x % 2 !== 0) // xor
        {
            return '\x1b[30m'
        } // black
        else {
            return '\x1b[37m'
        } // white
    }
}

function getPieceUnicode(piece, color) {
    if (color === 'white') {
        return whitePieceUnicodes.get(piece.name)
    } else {
        return blackPieceUnicodes.get(piece.name)
    }
}

function getSquareTextAt(loc) {
    const piece = pieceAt(loc)
    if (piece) {
        return getPieceUnicode(piece.piece, piece.color) + ' '
    }
    return squares[8 - loc.y][loc.x - 1]
}

function valueIncludes(array, value) {
    if (!array) return false
    return array.some((element) => {
        return JSON.stringify(element) === JSON.stringify(value)
    })
}

module.exports = {
    getAttackingPiecesLocations,
    removePiece,
    putPiece,
    isInsideBoard,
    setupDefaultBoard,
    squareToLocation,
    locationToSquare,
    pieceAt,
    printBoard
}
