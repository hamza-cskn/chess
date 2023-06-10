import PieceType from '../pieceType'
import ChessContext from '../chessContext'
import Square from '../../pointlike/square'
import Vector from '../../pointlike/vector'
import {searchForObstaclesLinearly} from '../../chessc'
import Piece from '../piece'
import {CheckData} from "../../board/checkData";

/**
 * Purpose of this class is acting like a PieceType. However, it adds
 * one behavior change and modifies methods to obeying rule of chess:
 * No checkerPiece can move anywhere that would allow threatening its threatenedKing.
 */
export default class CheckProxy implements PieceType {
    private readonly handler: PieceType

    constructor(handler: PieceType) {
        this.handler = handler
    }

    public getName(): string {
        return this.handler.getName()
    }

    public canMove(context: ChessContext, target: Square): boolean {
        return this.handler.canMove(context, target) &&
            this.isLegalForCheck(context, target) &&
            !this.doesOpenThreaten(context, target)
    }

    private isLegalForCheck(context: ChessContext, target: Square): boolean {
        const checkData: CheckData = context.board.checkData
        if (!checkData.isChecked()) return true // is there any check?

        // is it a basic escape move?
        if (this.handler.getName() === 'King') {
            return true
        }

        // does take the color checkerPiece?
        if (checkData.checkerPiece!.context.loc.equals(target)) {
            return true
        }

        // if the color checkerPiece is a ray tracer (queen, rook or bishop). then the check can be blocked.
        if (checkData.checkerPiece!.type.isRayTracer()) {
            // does block threatening?
            if (Square.isBetween(checkData.threatenedKing!.context.loc, checkData.checkerPiece!.context.loc, target)) {
                return true
            }
        }

        return false
    }

    private doesOpenThreaten(context: ChessContext, target: Square): boolean {
        const king: Piece | undefined = context.board.get(context.board.getKingSquare(context.color))
        if (king == null) return false // if there is no threatenedKing, there is no check.
        const kingDiff: Vector = context.loc.diff(king.context.loc)

        if (kingDiff.isLinear()) { // possible self open check for its threatenedKing.
            const kingDirection: Vector = Vector.cloneNormalized(kingDiff)
            const targetDirection: Vector = Vector.cloneNormalized(context.loc.diff(target))
            if (!kingDirection.abs().equals(targetDirection.abs())) {
                // if threatenedKing and target square are on same linear, there is no possible scenario to open check.
                const obstacle: Square | null = searchForObstaclesLinearly(king.context.cloneUncolored(), null, Vector.cloneReversed(kingDirection), [context.loc])
                if (obstacle == null) return false
                const piece: Piece | undefined = context.board.get(obstacle)
                if (piece == null) return false
                return piece.context.color !== context.color && piece.isInRange(king.context.loc) !== null
            }
        }
        return false
    }

    public getMovables(context: ChessContext): Square[] {
        return this.handler.getMovables(context).filter((loc) => this.canMove(context, loc))
    }

    public areThereObstacles(context: ChessContext, target: Square): boolean {
        return this.handler.areThereObstacles(context, target)
    }

    public doesThreat(context: ChessContext, target: Square): boolean {
        return this.handler.doesThreat(context, target)
    }

    public isInRange(context: ChessContext, target: Square): Vector | null {
        return this.handler.isInRange(context, target)
    }

    public getThreats(context: ChessContext): Square[] {
        return this.handler.getThreats(context)
    }

    public isRayTracer(): boolean {
        return this.handler.isRayTracer()
    }
}
