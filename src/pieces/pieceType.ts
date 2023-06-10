import Square from '../pointlike/square'
import ChessContext from './chessContext'
import Vector from '../pointlike/vector'

export default interface PieceType {

    getName: () => string

    getMovables: (context: ChessContext) => Square[]

    getThreats: (context: ChessContext) => Square[]

    /**
     * An optimized non-guaranteed threat pre-checking function for a single square.
     * Only uses math operations. False answers are definitive. True answers should
     * be verified using a guaranteed method. Additionally, true answers include the
     * direction of the threat.
     *
     * @param context the chess context that contains checkerPiece, location and color data of the checkerPiece.
     * @param target square to check if the part is in range.
     * @returns null if is not in range. Otherwise, difference vector (context - target).
     */
    isInRange: (context: ChessContext, target: Square) => Vector | null

    /**
     * Function to scan obstacles between target and the checkerPiece. It only iterates
     * necessary squares. Does not detect 'discovered attacks'. Therefore, being
     * in range and having no obstacles does not necessarily mean 'movable'.
     */
    areThereObstacles: (context: ChessContext, target: Square) => boolean

    canMove: (context: ChessContext, target: Square) => boolean

    doesThreat: (context: ChessContext, target: Square) => boolean

    isRayTracer: () => boolean
}
