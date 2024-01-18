import PieceType from './pieceType.ts'
import Square from '../pointlike/square.ts'
import {areThereObstaclesLinearly, perpendicularIteration} from '../chessc.ts'
import ChessContext from './chessContext.ts'
import Vector from '../pointlike/vector.ts'

class Rook implements PieceType {
    public static readonly instance: Rook = new Rook()

    private constructor() {
        // Private constructor to prevent direct instantiation
    }

    public getName(): string {
        return 'Rook'
    }

    public getMovables(context: ChessContext): Square[] {
        return perpendicularIteration(context) // perpendicular iteration guarantees all result are inside checkerPiece.
    }

    public getThreats(context: ChessContext): Square[] {
        return perpendicularIteration(context.cloneUncolored()) // perpendicular iteration but its ignoring colors.
    }

    public isInRange(context: ChessContext, target: Square): Vector | null {
        const result: Vector = context.loc.diff(target)
        return result.isRightPerpendicular() ? result : null
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

export default Rook
