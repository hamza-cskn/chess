import PieceType from './pieceType.ts'
import Square from '../pointlike/square.ts'
import Color from '../color.ts'
import ChessContext from './chessContext.ts'
import Vector from '../pointlike/vector.ts'
import {areThereObstaclesLinearly} from '../chessc.ts'
import Piece from './piece.ts'

class Pawn implements PieceType {
    public static readonly instance: Pawn = new Pawn()

    private constructor() {
        // Private constructor to prevent direct instantiation
    }

    public getName(): string {
        return 'Pawn'
    }

    public getMovables(context: ChessContext): Square[] {
        const result: Square[] = []
        const direction: number = this.getDirection(context.color as Color)

        // add forward square if empty,
        const forward: Square = context.loc.add(0, 1 * direction)
        if (context.board.get(forward) == null) {
            result.push(forward)

            // double step
            const twoStepForward: Square = context.loc.add(0, 2 * direction)
            if (this.isDoubleStep(context) && (context.board.get(twoStepForward) == null)) {
                result.push(twoStepForward)
            }
        }
        // todo - en passant

        result.push(...this.getThreats(context).filter(loc => {
            const piece: Piece | undefined = context.board.get(loc)
            return (piece != null) && piece.context.color !== context.color
        })) // add squares contains opponent and threatened

        return result.filter(loc => loc.isInsideBoard())
    }

    public getThreats(context: ChessContext): Square[] {
        const direction = this.getDirection(context.color as Color)
        return [
            context.loc.add(1, 1 * direction),
            context.loc.add(-1, 1 * direction)]
            .filter(loc => loc.isInsideBoard())
    }

    public getDirection(color: Color): number {
        return color === Color.WHITE ? 1 : -1
    }

    public isInRange(context: ChessContext, target: Square): Vector | null {
        const xDiff = Math.abs(target.x - context.loc.x)
        const yDiff = target.y - context.loc.y

        if (xDiff === 1 && yDiff === 1 * this.getDirection(context.color as Color)) {
            return new Vector(context.loc.x - target.x, context.loc.y - target.y)
        }
        return null
    }

    private isDoubleStep(context: ChessContext): boolean {
        return (context.color === Color.WHITE && context.loc.y === 1) ||
            (context.color === Color.BLACK && context.loc.y === 6)
    }

    public areThereObstacles(context: ChessContext, target: Square): boolean {
        return areThereObstaclesLinearly(context, target, new Vector(0, -1 * this.getDirection(context.color as Color))) !== null // reversed direction given because obstacle color method reverses vectors.
    }

    public canMove(context: ChessContext, target: Square): boolean {
        return this.getMovables(context).find((l) => l.equals(target)) !== undefined
    }

    public doesThreat(context: ChessContext, target: Square): boolean {
        return this.isInRange(context.cloneUncolored(), target) !== null
    }

    public isRayTracer(): boolean {
        return false
    }
}

export default Pawn
