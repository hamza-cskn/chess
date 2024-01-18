import PieceType from './pieceType.ts'
import Square from '../pointlike/square.ts'
import ChessContext from './chessContext.ts'
import Vector from '../pointlike/vector.ts'

class Knight implements PieceType {
    public static readonly instance: Knight = new Knight()

    public getName(): string {
        return 'Knight'
    }

    private constructor() {
        // Private constructor to prevent direct instantiation
    }

    public getMovables(context: ChessContext): Square[] {
        // todo - check is the possible move starts a new threat to the threatenedKing?
        return this.getThreats(context).filter(loc => {
            const piece = context.board.get(loc)
            return (piece == null) || piece.context.color !== context.color
        })
    }

    public getThreats(context: ChessContext): Square[] {
        return [
            context.loc.add(1, 2),
            context.loc.add(1, -2),
            context.loc.add(2, 1),
            context.loc.add(2, -1),
            context.loc.add(-1, -2),
            context.loc.add(-1, 2),
            context.loc.add(-2, -1),
            context.loc.add(-2, 1)
        ].filter(loc => loc.isInsideBoard())
    }

    public isInRange(context: ChessContext, target: Square): Vector | null {
        const xDiff = Math.abs(context.loc.x - target.x)
        const yDiff = Math.abs(context.loc.y - target.y)
        if ((xDiff === 2 && yDiff === 1) || (xDiff === 1 && yDiff === 2)) {
            return new Vector(context.loc.x - target.x, context.loc.y - target.y)
        }
        return null
    }

    public areThereObstacles(context: ChessContext, target: Square): boolean {
        // if target is same color with the knight, target is an obstacle.
        return context.board.get(target)?.context.color === context.color
    }

    public canMove(context: ChessContext, target: Square) {
        if (this.isInRange(context, target) == null) return false
        return !this.areThereObstacles(context, target)
    }

    public doesThreat(context: ChessContext, target: Square) {
        return this.isInRange(context, target) !== null
        // colors are ignored
    }

    public isRayTracer(): boolean {
        return false
    }
}

export default Knight
