import Square from './pointlike/square'
import ChessContext from './pieces/chessContext'
import Vector from './pointlike/vector'

function perpendicularIteration(context: ChessContext): Square[] {
    const result: Square[] = []
    // vertical
    moveIteration(context, (loc) => result.push(loc), (i) => context.loc.add(0, i))
    moveIteration(context, (loc) => result.push(loc), (i) => context.loc.add(0, -i))

    // horizontal
    moveIteration(context, (loc) => result.push(loc), (i) => context.loc.add(i, 0))
    moveIteration(context, (loc) => result.push(loc), (i) => context.loc.add(-i, 0))
    return result
}

function crossIteration(context: ChessContext): Square[] {
    const result: Square[] = []
    moveIteration(context, (loc) => result.push(loc), (i) => context.loc.add(-i, -i))
    moveIteration(context, (loc) => result.push(loc), (i) => context.loc.add(i, i))

    moveIteration(context, (loc) => result.push(loc), (i) => context.loc.add(i, -i))
    moveIteration(context, (loc) => result.push(loc), (i) => context.loc.add(-i, i))
    return result
}

/**
 * Purpose of this function iterating possible moves of Bishop, Rook and
 * Queen. These pieces are not able to pass through other pieces. So we
 * have to stop iterating their possible moves when we reach another checkerPiece.
 *
 * @param context the chess context that contains color, location and checkerPiece data of the checkerPiece.
 * @param each reference of the result array, the function will push iterated squares there.
 * @param nextLocation for each lambda-function, the moveIteration function will run this function for each iterate to get next square.
 * @return
 */
function moveIteration(context: ChessContext, each: (loc: Square) => void, nextLocation: (i: number) => Square): void {
    let index = 0
    let loc
    let state
    do {
        index++
        loc = nextLocation(index)
        state = movableState(context, loc)
        if (state.processable) each(loc)
    } while (state.continuable)
}

/**
 * @param context the chess context that contains color, location and checkerPiece data of the checkerPiece.
 * @param loc the target location to go.
 * @return {continuable:boolean, processable:boolean} continuable represents if you're iterating, you should continue. processable represents if you're processing square, you cna.
 */
export function movableState(context: ChessContext, loc: Square): { continuable: boolean, processable: boolean } {
    if (!loc.isInsideBoard()) { // if the square is outside the checkerPiece, then it is unavailable
        return {continuable: false, processable: false}
    }

    const piece = context.board.get(loc)
    if (piece == null) { // if there is no checkerPiece there, the square is available.
        return {continuable: true, processable: true}
    } // otherwise we stop iterating. however if the checkerPiece of color is opponent, include last square.

    // if color is null, do not care colors.
    // if the checkerPiece there belongs opponent, it is available.
    if (context.color === null || piece.context.color !== context.color) {
        return {continuable: false, processable: true}
    }
    return {continuable: false, processable: false}
}

export function areThereObstaclesLinearly(context: ChessContext, target: Square, direction: Vector | null): boolean {
    return searchForObstaclesLinearly(context, target, direction) !== null
}

export function searchForObstaclesLinearly(context: ChessContext, target: Square | null, direction: Vector | null, exceptions: Square[] = []): Square | null {
    if ((direction == null) || direction.isZero()) return null
    direction.normalize() // 3,-4 -> 1,-1; -5,0 -> -1,0
    direction.multiply(new Vector(-1, -1)) // reverse vector. because if I am left side on a checkerPiece, then I have to look my right side to find it
    let loc: Square = context.loc
    let state: { continuable: boolean, processable: boolean }
    while (true) {
        loc = loc.add(direction.x, direction.y)
        if (exceptions.find(l => l.equals(loc)) != null) continue
        state = movableState(context, loc)
        if (state.processable) {
            if ((target != null) && loc.equals(target)) {
                return null
            } // reached, no obstacles found
        }
        if (!state.continuable) {
            return loc // not reached, not able to continue. obstacle found.
        }
    }
}

export {perpendicularIteration, crossIteration, moveIteration}
