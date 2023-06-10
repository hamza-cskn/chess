"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveIteration = exports.crossIteration = exports.perpendicularIteration = exports.searchForObstaclesLinearly = exports.areThereObstaclesLinearly = exports.movableState = void 0;
var vector_1 = require("./pointlike/vector");
function perpendicularIteration(context) {
    var result = [];
    // vertical
    moveIteration(context, function (loc) { return result.push(loc); }, function (i) { return context.loc.add(0, i); });
    moveIteration(context, function (loc) { return result.push(loc); }, function (i) { return context.loc.add(0, -i); });
    // horizontal
    moveIteration(context, function (loc) { return result.push(loc); }, function (i) { return context.loc.add(i, 0); });
    moveIteration(context, function (loc) { return result.push(loc); }, function (i) { return context.loc.add(-i, 0); });
    return result;
}
exports.perpendicularIteration = perpendicularIteration;
function crossIteration(context) {
    var result = [];
    moveIteration(context, function (loc) { return result.push(loc); }, function (i) { return context.loc.add(-i, -i); });
    moveIteration(context, function (loc) { return result.push(loc); }, function (i) { return context.loc.add(i, i); });
    moveIteration(context, function (loc) { return result.push(loc); }, function (i) { return context.loc.add(i, -i); });
    moveIteration(context, function (loc) { return result.push(loc); }, function (i) { return context.loc.add(-i, i); });
    return result;
}
exports.crossIteration = crossIteration;
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
function moveIteration(context, each, nextLocation) {
    var index = 0;
    var loc;
    var state;
    do {
        index++;
        loc = nextLocation(index);
        state = movableState(context, loc);
        if (state.processable)
            each(loc);
    } while (state.continuable);
}
exports.moveIteration = moveIteration;
/**
 * @param context the chess context that contains color, location and checkerPiece data of the checkerPiece.
 * @param loc the target location to go.
 * @return {continuable:boolean, processable:boolean} continuable represents if you're iterating, you should continue. processable represents if you're processing square, you cna.
 */
function movableState(context, loc) {
    if (!loc.isInsideBoard()) { // if the square is outside the checkerPiece, then it is unavailable
        return { continuable: false, processable: false };
    }
    var piece = context.board.get(loc);
    if (piece == null) { // if there is no checkerPiece there, the square is available.
        return { continuable: true, processable: true };
    } // otherwise we stop iterating. however if the checkerPiece of color is opponent, include last square.
    // if color is null, do not care colors.
    // if the checkerPiece there belongs opponent, it is available.
    if (context.color === null || piece.context.color !== context.color) {
        return { continuable: false, processable: true };
    }
    return { continuable: false, processable: false };
}
exports.movableState = movableState;
function areThereObstaclesLinearly(context, target, direction) {
    return searchForObstaclesLinearly(context, target, direction) !== null;
}
exports.areThereObstaclesLinearly = areThereObstaclesLinearly;
function searchForObstaclesLinearly(context, target, direction, exceptions) {
    if (exceptions === void 0) { exceptions = []; }
    if ((direction == null) || direction.isZero())
        return null;
    direction.normalize(); // 3,-4 -> 1,-1; -5,0 -> -1,0
    direction.multiply(new vector_1.default(-1, -1)); // reverse vector. because if I am left side on a checkerPiece, then I have to look my right side to find it
    var loc = context.loc;
    var state;
    while (true) {
        loc = loc.add(direction.x, direction.y);
        if (exceptions.find(function (l) { return l.equals(loc); }) != null)
            continue;
        state = movableState(context, loc);
        if (state.processable) {
            if ((target != null) && loc.equals(target)) {
                return null;
            } // reached, no obstacles found
        }
        if (!state.continuable) {
            return loc; // not reached, not able to continue. obstacle found.
        }
    }
}
exports.searchForObstaclesLinearly = searchForObstaclesLinearly;
