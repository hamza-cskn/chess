"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckData = void 0;
var color_1 = require("../color");
var util_1 = require("../util");
var CheckData = /** @class */ (function () {
    function CheckData() {
        this._color = null;
        this._move = null;
        this._checkerPiece = null;
        this._threatenedKing = null;
    }
    CheckData.prototype.isChecked = function () {
        return this.checkerPiece !== null;
    };
    Object.defineProperty(CheckData.prototype, "color", {
        get: function () {
            return this._color;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CheckData.prototype, "move", {
        get: function () {
            return this._move;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CheckData.prototype, "checkerPiece", {
        get: function () {
            return this._checkerPiece;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CheckData.prototype, "threatenedKing", {
        get: function () {
            return this._threatenedKing;
        },
        enumerable: false,
        configurable: true
    });
    CheckData.prototype.onMove = function (piece, move, color, board) {
        var opponentColor = color === color_1.default.WHITE ? color_1.default.BLACK : color_1.default.WHITE;
        var kingPiece = board.get(board.getKingSquare(opponentColor));
        if (kingPiece != null && util_1.default.isThereThreaten(kingPiece === null || kingPiece === void 0 ? void 0 : kingPiece.context)) {
            this._color = color;
            this._move = move;
            this._checkerPiece = piece;
            this._threatenedKing = kingPiece;
        }
        else {
            this._color = null;
            this._move = null;
            this._checkerPiece = null;
            this._threatenedKing = null;
        }
    };
    return CheckData;
}());
exports.CheckData = CheckData;
