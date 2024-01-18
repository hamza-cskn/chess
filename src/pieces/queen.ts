import PieceType from './pieceType.ts'
import Square from '../pointlike/square.ts'
import {areThereObstaclesLinearly, crossIteration, perpendicularIteration} from '../chessc.ts'
import Vector from '../pointlike/vector.ts'
import ChessContext from './chessContext.ts'

class Queen implements PieceType {
    public static readonly instance: Queen = new Queen()

    private constructor() {
        // Private constructor to prevent direct instantiation
    }

    public getName(): string {
        return 'Queen'
    }

    public getMovables(context: ChessContext): Square[] {
        // todo - check is the possible move starts a new threat to the threatenedKing?
        return crossIteration(context).concat(perpendicularIteration(context))
    }

    public getThreats(context: ChessContext): Square[] {
        return crossIteration(context.cloneUncolored()).concat(perpendicularIteration(context.cloneUncolored()))
    }

    public isInRange(context: ChessContext, target: Square): Vector | null {
        const result: Vector = context.loc.diff(target)
        return result.isLinear() ? result : null
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

export default Queen
