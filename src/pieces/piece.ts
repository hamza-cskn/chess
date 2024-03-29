import PieceType from './pieceType.ts'
import Square from '../pointlike/square.ts'
import Board from '../board/board.ts'
import Vector from '../pointlike/vector.ts'
import ChessContext from './chessContext.ts'
import CheckProxy from './check/checkproxy.ts'
import Color from '../color.ts'

export default class Piece {
    public readonly type: PieceType
    public readonly context: ChessContext

    constructor(board: Board, type: PieceType, loc: Square, color: Color) {
        this.context = new ChessContext(board, loc, color)
        this.type = new CheckProxy(type)
    }

    public getMovables(): Square[] {
        return this.type.getMovables(this.context)
    }

    public getThreats(): Square[] {
        return this.type.getThreats(this.context)
    }

    public isInRange(target: Square): Vector | null {
        return this.type.isInRange(this.context, target)
    }

    public areThereObstacles(target: Square): boolean {
        return this.type.areThereObstacles(this.context, target)
    }

    public canMove(target: Square): boolean {
        return this.type.canMove(this.context, target)
    }

    public doesThreat(target: Square): boolean {
        if (target.equals(this.context.loc)) return false
        return this.type.doesThreat(this.context, target)
    }
}
