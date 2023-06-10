"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChessContext = /** @class */ (function () {
    function ChessContext(board, loc, color) {
        this.board = board;
        this.loc = loc;
        this.color = color;
    }
    ChessContext.prototype.clone = function () {
        return new ChessContext(this.board, this.loc, this.color);
    };
    ChessContext.prototype.cloneUncolored = function () {
        return new ChessContext(this.board, this.loc, null);
    };
    return ChessContext;
}());
exports.default = ChessContext;
