import Board from '../board/board.ts'
import Color from '../color.ts'
import Square from '../pointlike/square.ts'

export default class ChessContext {
    public readonly board: Board
    public readonly color: Color | null
    public loc: Square

    constructor(board: Board, loc: Square, color: Color | null) {
        this.board = board
        this.loc = loc
        this.color = color
    }

    public clone() {
        return new ChessContext(this.board, this.loc, this.color)
    }

    public cloneUncolored() {
        return new ChessContext(this.board, this.loc, null)
    }
}
