"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var piece_1 = require("./pieces/piece");
var square_1 = require("./pointlike/square");
var king_1 = require("./pieces/king");
var color_1 = require("./color");
var queen_1 = require("./pieces/queen");
var rook_1 = require("./pieces/rook");
var knight_1 = require("./pieces/knight");
var bishop_1 = require("./pieces/bishop");
var pawn_1 = require("./pieces/pawn");
var board_1 = require("./board/board");
var FEN_REGEX = /^([rnbqkpRNBQKP1-8]+\/){7}[rnbqkpRNBQKP1-8]+\s[wb]\s([-kqKQ]{1,4}|-)\s(-|[a-h][36])\s\d+\s\d+$/;
function isThereThreaten(context) {
    var e_1, _a;
    try {
        for (var _b = __values(context.board.board.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var piece = _c.value;
            if (piece.context.color !== context.color && piece.doesThreat(context.loc)) {
                return true;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return false;
}
function createDefaultBoard() {
    return createBoardFromFEN('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
}
function createBoardFromFEN(fen) {
    var e_2, _a;
    if (!FEN_REGEX.test(fen))
        throw new Error('Invalid FEN: ' + fen);
    var board = new board_1.default();
    var boardData = fen.split(' ')[0];
    var fenParts = boardData.split('/');
    for (var rank = 0; rank < 8; rank++) {
        var file = 0;
        try {
            for (var _b = (e_2 = void 0, __values(fenParts[rank])), _c = _b.next(); !_c.done; _c = _b.next()) {
                var char = _c.value;
                if (isNaN(Number(char))) {
                    var color = char === char.toUpperCase() ? color_1.default.WHITE : color_1.default.BLACK;
                    var pieceType = pieceTypeFromChar(char.toLowerCase());
                    var square = new square_1.default(file, 7 - rank);
                    var piece = new piece_1.default(board, pieceType, square, color);
                    board.set(square, piece);
                    file++;
                }
                else {
                    file += parseInt(char);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    return board;
}
// @ts-ignore
function pieceTypeFromChar(str) {
    if (str === 'p')
        return pawn_1.default.instance;
    if (str === 'r')
        return rook_1.default.instance;
    if (str === 'n')
        return knight_1.default.instance;
    if (str === 'b')
        return bishop_1.default.instance;
    if (str === 'q')
        return queen_1.default.instance;
    if (str === 'k')
        return king_1.default.instance;
    throw new Error('unknown checkerPiece type');
}
exports.default = {
    createDefaultBoard: createDefaultBoard,
    isThereThreaten: isThereThreaten,
    createBoardFromFEN: createBoardFromFEN
};
