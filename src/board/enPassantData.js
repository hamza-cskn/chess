"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnPassantData = void 0;
var EnPassantData = /** @class */ (function () {
    function EnPassantData() {
        this._move = null;
    }
    Object.defineProperty(EnPassantData.prototype, "move", {
        get: function () {
            return this._move;
        },
        enumerable: false,
        configurable: true
    });
    EnPassantData.prototype.onMove = function (piece, move, color, board) {
        if (piece.type.getName() === 'Pawn' && Math.abs(move.from.y - move.to.y) === 2) {
            this._move = move;
        }
        else {
            this._move = null;
        }
    };
    return EnPassantData;
}());
exports.EnPassantData = EnPassantData;
