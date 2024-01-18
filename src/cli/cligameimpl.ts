import GameManager from '../game/gameManager.ts'
import Move from '../game/move.ts'
import Square from '../pointlike/square.ts'
import Color from '../color.ts'
import PieceType from '../pieces/pieceType.ts'
import Board from '../board/board.ts'
import {CheckData} from "../board/checkData.ts";

import readlineSync from 'readline-sync'

export default class CliGameImpl extends GameManager {
    private static readonly whitePieceUnicodes = new Map()
    private static readonly blackPieceUnicodes = new Map()

    static {
        CliGameImpl.whitePieceUnicodes.set('King', '♔')
        CliGameImpl.whitePieceUnicodes.set('Queen', '♕')
        CliGameImpl.whitePieceUnicodes.set('Bishop', '♗')
        CliGameImpl.whitePieceUnicodes.set('Knight', '♘')
        CliGameImpl.whitePieceUnicodes.set('Rook', '♖')
        CliGameImpl.whitePieceUnicodes.set('Pawn', '♙')

        CliGameImpl.blackPieceUnicodes.set('King', '♚')
        CliGameImpl.blackPieceUnicodes.set('Queen', '♛')
        CliGameImpl.blackPieceUnicodes.set('Bishop', '♝')
        CliGameImpl.blackPieceUnicodes.set('Knight', '♞')
        CliGameImpl.blackPieceUnicodes.set('Rook', '♜')
        CliGameImpl.blackPieceUnicodes.set('Pawn', '♟')
    }

    public constructor(board: Board) {
        super(board)
    }

    public onCheck(checkData: CheckData): void {
        // @ts-ignore
        console.log((checkData.color === Color.WHITE ? 'White' : 'Black') === +' checked with ' + checkData.move.toString() + ' by a ' + checkData.piece.type.getName())
    }

    public onTurn(): Move {
        this.printBoard([])
        console.log("To make a move: '<from> <to>' (e.g: 'e2 e4')")
        console.log("To see legal moves: '<square>' (e.g: 'e2')")
        console.log('Move turn is ' + (this.getTurn() === Color.WHITE ? 'White' : 'Black') + '!\n')
        while (true) {
            const input = readlineSync.question('\x1b[33mEnter input: ')
            if (input.length === 5) {
                const move: Move = Move.fromString(input)
                if (this.canMove(move)) {
                    return move
                }
                console.log('Invalid move. Please try again.')
            } else if (input.length === 2) {
                console.time('legalMoveCalculation')
                const legalMoves = super.getLegalMoves(Square.fromString(input))
                console.timeEnd('legalMoveCalculation')
                this.printBoard(legalMoves)
            }
        }
    }

    public printBoard(movableSquares: Square[]) {
        for (let row = 7; row >= 0; row--) {
            let line = '\x1b[31m' + (row + 1) + ' '
            for (let column = 0; column < 8; column++) {
                line += this.getFormattedSquareAt(new Square(column, row), movableSquares)
            }

            console.log(line)
        }
        console.log('\x1b[31m   a  b  c  d  e  f  g  h\x1b[0m')
    }

    private getFormattedSquareAt(loc: Square, movableSquares: Square[]) {
        let backgroundColor = this.getSquareBackgroundColor(loc)
        const foregroundColor = this.getSquareForegroundColor(loc)
        const content = ' ' + this.getSquareTextAt(loc)

        if (this.valueIncludes(movableSquares, loc)) {
            backgroundColor = '\x1b[42m'
        }

        return backgroundColor + foregroundColor + content + '\x1b[0m' /* reset */
    }

    private xor(a: boolean, b: boolean): boolean {
        return (a && !b) || (!a && b)
    }

    private getSquareBackgroundColor(loc: Square) {
        if (this.xor(loc.y % 2 !== 0, loc.x % 2 !== 0)) // xor
        {
            return '\x1b[48;5;240m'
        } // black
        else {
            return '\x1b[48;5;15m'
        } // white
    }

    private getSquareForegroundColor(loc: Square) {
        const piece = this.board.get(loc)
        if (piece != null) {
            if (piece.context.color === Color.WHITE) {
                return '\x1b[36m'
            } else {
                return '\x1b[34m'
            }
        } else {
            if (this.xor(loc.y % 2 !== 0, loc.x % 2 !== 0)) // xor
            {
                return '\x1b[30m'
            } // black
            else {
                return '\x1b[37m'
            } // white
        }
    }

    private getPieceUnicode(piecetype: PieceType, color: Color | null) {
        if (color === Color.WHITE) {
            return CliGameImpl.whitePieceUnicodes.get(piecetype.getName()) || '?'
        } else {
            return CliGameImpl.blackPieceUnicodes.get(piecetype.getName()) || '?'
        }
    }

    private getSquareTextAt(loc: Square) {
        const piece = this.board.get(loc)
        if (piece != null) {
            return this.getPieceUnicode(piece.type, piece.context.color) + ' '
        }
        return loc.toString()
    }

    private valueIncludes(array: any[], value: any) {
        if (!array) return false
        if (array.length === 0) return false
        return array.some((element) => {
            return JSON.stringify(element) === JSON.stringify(value)
        })
    }
}
