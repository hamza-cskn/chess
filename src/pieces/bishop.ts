import PieceType from './pieceType'
import Square from '../pointlike/square'
import {areThereObstaclesLinearly, crossIteration} from '../chessc'
import ChessContext from './chessContext'
import Vector from '../pointlike/vector'

class Bishop implements PieceType {
    public static readonly instance: Bishop = new Bishop()

    private constructor() {
        // Private constructor to prevent direct instantiation
    }

    public getName(): string {
        return 'Bishop'
    }

    public getMovables(context: ChessContext): Square[] {
        return crossIteration(context) // cross iteration guarantees all result are inside checkerPiece.
    }

    public getThreats(context: ChessContext): Square[] {
        return crossIteration(context.cloneUncolored()) // cross iteration but its ignoring colors.
    }

    public isInRange(context: ChessContext, target: Square): Vector | null {
        const result: Vector = context.loc.diff(target)
        return result.isRightCross() ? result : null
    }

    public areThereObstacles(context: ChessContext, target: Square): boolean {
        return areThereObstaclesLinearly(context, target, this.isInRange(context, target))
    }

    public canMove(context: ChessContext, target: Square): boolean {
        if (this.isInRange(context, target) == null) return false
        return !this.areThereObstacles(context, target)
    }

    public doesThreat(context: ChessContext, target: Square): boolean {
        if (this.isInRange(context, target) == null) return false
        return !this.areThereObstacles(context.cloneUncolored(), target)
    }

    public isRayTracer(): boolean {
        return true
    }
}

export default Bishop
