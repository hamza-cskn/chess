"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveData = void 0;
var MoveData = /** @class */ (function () {
    function MoveData() {
        this._halfmoveCounter = 0;
        this._moves = [];
    }
    Object.defineProperty(MoveData.prototype, "moves", {
        get: function () {
            return this._moves;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MoveData.prototype, "halfmoveCounter", {
        get: function () {
            return this._halfmoveCounter;
        },
        set: function (value) {
            this._halfmoveCounter = value;
        },
        enumerable: false,
        configurable: true
    });
    MoveData.prototype.onMove = function (piece, move, color, board) {
        this._moves.push(move);
        var pieceTaken = board.get(move.to);
        if (pieceTaken) {
            this._halfmoveCounter = 0;
        }
        else {
            this._halfmoveCounter++;
        }
    };
    return MoveData;
}());
exports.MoveData = MoveData;
