import PieceType from './pieceType.ts'
import Square from '../pointlike/square.ts'
import ChessContext from './chessContext.ts'
import Vector from '../pointlike/vector.ts'
import Util from '../util.ts'
import Piece from './piece.ts'

class King implements PieceType {
    public static readonly instance: King = new King()

    private constructor() {
        // Private constructor to prevent direct instantiation
    }

    public getName(): string {
        return 'King'
    }

    public getMovables(context: ChessContext): Square[] {
        // todo - castling
        // todo - prevent moving to frames threatened
        return this.getThreats(context)
            .filter((l) => { // filter friendly squares
                const piece: Piece | undefined = context.board.get(l)
                return (piece == null) || piece.context.color !== context.color
            }).filter((l) => !Util.isThereThreaten(new ChessContext(context.board, l, context.color))) // filter threaten squares
    }

    public getThreats(context: ChessContext): Square[] {
        return [
            context.loc.add(1, 1),
            context.loc.add(1, 0),
            context.loc.add(1, -1),
            context.loc.add(0, 1),
            context.loc.add(0, -1),
            context.loc.add(-1, 1),
            context.loc.add(-1, 0),
            context.loc.add(-1, -1)]
            .filter(loc => loc.isInsideBoard())
    }

    public isInRange(context: ChessContext, target: Square): Vector | null {
        const xDiff = Math.abs(context.loc.x - target.x)
        const yDiff = Math.abs(context.loc.y - target.y)
        if (xDiff <= 1 && yDiff <= 1) { // assume not xDiff === yDiff === 0
            return new Vector(context.loc.x - target.x, context.loc.y - target.y)
        }
        return null
    }

    public areThereObstacles(context: ChessContext, target: Square): boolean {
        // if target is same color with the knight, target is an obstacle.
        return context.board.get(target)?.context.color === context.color
    }

    public canMove(context: ChessContext, target: Square) {
        return this.getMovables(context).find((l) => target.equals(l)) !== undefined
    }

    public doesThreat(context: ChessContext, target: Square) {
        if (this.isInRange(context, target) == null) return false
        return !this.areThereObstacles(context.cloneUncolored(), target)
    }

    public isRayTracer(): boolean {
        return false
    }
}

export default King
