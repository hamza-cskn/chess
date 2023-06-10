// @ts-ignore
const Square = require("../../src/pointlike/square").default
const PieceType = require("../../src/pieces/pieceType").default
const Color = require("../../src/color").default
const Piece = require("../../src/pieces/piece").default
const Pawn = require("../../src/pieces/pawn").default
const Board = require("../../src/board/board").default
const Knight = require("../../src/pieces/knight").default
const Queen = require("../../src/pieces/queen").default
const Rook = require("../../src/pieces/rook").default
const Bishop = require("../../src/pieces/bishop").default
const King = require("../../src/pieces/king").default
const Util = require("../../src/util").default;

// @ts-ignore
function moveTestFen(fen, loc, expected) {
    const board = Util.createBoardFromFEN(fen);
    const piece = board.get(loc);
    // @ts-ignore
    const movables = piece.getMovables().map((l) => l.toString()).sort();
    expect(movables).toEqual(expected.sort());
}

test('Pawn movement double step', () => {
    moveTestFen("8/8/8/8/8/8/1P6/8 w - - 0 1", Square.fromString("b2"), ["b3", "b4"])
});

test('Pawn movement', () => {
    moveTestFen("8/8/8/8/8/1P6/8/8 w - - 0 1", Square.fromString("b3"), ["b4"])
});

test('General Knight movement', () => {
    moveTestFen("8/8/8/4N3/8/8/8/8 w - - 0 1", Square.fromString("e5"), ["f7", "f3", "g6", "g4", "d3", "d7", "c4", "c6"])
});

test('General Queen movement', () => {
    moveTestFen("8/8/8/4Q3/8/8/8/8 w - - 0 1", Square.fromString("e5"), ["e1", "e2", "e3", "e4", "e6", "e7", "e8", "a5", "b5", "c5", "d5", "f5", "g5", "h5", "a1", "b2", "c3", "d4", "f6", "g7", "h8", "f4", "g3", "h2", "d6", "c7", "b8"])
});

test('General Rook movement', () => {
    moveTestFen("8/8/8/4R3/8/8/8/8 w - - 0 1", Square.fromString("e5"), ["e1", "e2", "e3", "e4", "e6", "e7", "e8", "a5", "b5", "c5", "d5", "f5", "g5", "h5"])
});

test('General Bishop movement', () => {
    moveTestFen("8/8/8/4B3/8/8/8/8 w - - 0 1", Square.fromString("e5"), ["a1", "b2", "c3", "d4", "f6", "g7", "h8", "f4", "g3", "h2", "d6", "c7", "b8"])
});

test('Queen obstacle check', () => {
    moveTestFen("8/4r3/8/2N1Q3/5P2/8/8/8 w - - 0 1", Square.fromString("e5"), ["f5", "g5", "h5", "e4", "e3", "e2", "e1", "d5", "e6", "e7", "d4", "c3", "b2", "a1", "f6", "g7", "h8", "d6", "c7", "b8"])
});

test('King safe move check', () => {
    moveTestFen("8/5p2/8/1RbK4/q1r1n3/8/7b/8 w - - 0 1", Square.fromString("d5"), ["c6"])
});

test('Self open-check check rook', () => {
    moveTestFen("8/8/8/1Q1r1k2/8/8/8/8 w - - 0 1", Square.fromString("d5"), ["e5", "c5", "b5"])
});

test('Self open-check check pawn', () => {
    moveTestFen("8/8/6n1/3K1P1q/8/8/8/8 w - - 0 1", Square.fromString("f5"), [])
});

//todo - add canMove and getMovables method comparison