import Piece from './pieces/piece.ts'
import Square from './pointlike/square.ts'
import King from './pieces/king.ts'
import Color from './color.ts'
import Queen from './pieces/queen.ts'
import Rook from './pieces/rook.ts'
import Knight from './pieces/knight.ts'
import Bishop from './pieces/bishop.ts'
import Pawn from './pieces/pawn.ts'
import Board from './board/board.ts'
import ChessContext from './pieces/chessContext.ts'

const FEN_REGEX: RegExp = /^([rnbqkpRNBQKP1-8]+\/){7}[rnbqkpRNBQKP1-8]+\s[wb]\s([-kqKQ]{1,4}|-)\s(-|[a-h][36])\s\d+\s\d+$/

function isThereThreaten(context: ChessContext): boolean {
    for (const piece of context.board.board.values()) {
        if (piece.context.color !== context.color && piece.doesThreat(context.loc)) {
            return true
        }
    }
    return false
}

function createDefaultBoard(): Board {
    return createBoardFromFEN('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
}

function createBoardFromFEN(fen: string) {
    if (!FEN_REGEX.test(fen)) throw new Error('Invalid FEN: ' + fen)

    const board = new Board()
    const boardData = fen.split(' ')[0]
    const fenParts = boardData.split('/')

    for (let rank = 0; rank < 8; rank++) {
        let file = 0
        for (const char of fenParts[rank]) {
            if (isNaN(Number(char))) {
                const color = char === char.toUpperCase() ? Color.WHITE : Color.BLACK
                const pieceType = pieceTypeFromChar(char.toLowerCase())
                const square = new Square(file, 7 - rank)
                const piece = new Piece(board, pieceType, square, color)
                board.set(square, piece)
                file++
            } else {
                file += parseInt(char)
            }
        }
    }
    return board
}

// @ts-ignore
function pieceTypeFromChar(str) {
    if (str === 'p') return Pawn.instance
    if (str === 'r') return Rook.instance
    if (str === 'n') return Knight.instance
    if (str === 'b') return Bishop.instance
    if (str === 'q') return Queen.instance
    if (str === 'k') return King.instance
    throw new Error('unknown checkerPiece type')
}

export default {
    createDefaultBoard,
    isThereThreaten,
    createBoardFromFEN
}
