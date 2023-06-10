"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var color_1 = require("../color");
var kingData_1 = require("./kingData");
var moveData_1 = require("./moveData");
var enPassantData_1 = require("./enPassantData");
var checkData_1 = require("./checkData");
var Board = /** @class */ (function () {
    function Board() {
        this._wKing = new kingData_1.KingData();
        this._bKing = new kingData_1.KingData(); //todo check scenarios that kings does not exist.
        this._moveData = new moveData_1.MoveData();
        this._enPassantData = new enPassantData_1.EnPassantData();
        this._checkData = new checkData_1.CheckData();
        this._moveListeners = [
            this._wKing,
            this._bKing,
            this._moveData,
            this._enPassantData,
            this._checkData
        ];
        this._board = new Map();
    }
    Board.prototype.forEach = function (each) {
        this._board.forEach(function (p, s) { return each(s, p); });
    };
    Object.defineProperty(Board.prototype, "moveListeners", {
        get: function () {
            return this._moveListeners;
        },
        enumerable: false,
        configurable: true
    });
    Board.prototype.set = function (square, piece) {
        if (!square.isInsideBoard())
            throw Error('checkerPiece cannot be outside board.');
        this._board.set(square.toNum(), piece);
        piece.context.loc = square;
        if (piece.type.getName() === "King") {
            var king = piece.context.color === color_1.default.WHITE ? this._wKing : this._bKing;
            king.king = piece;
        }
    };
    Board.prototype.get = function (square) {
        if (square == null)
            return undefined;
        return this._board.get(square.toNum());
    };
    Board.prototype.applyMove = function (move) {
        var _this = this;
        var piece = this.get(move.from);
        if (piece == null)
            throw Error('no checkerPiece found at ' + move.from.toString());
        this._moveListeners.forEach(function (listener) { return listener.onMove(piece, move, piece.context.color, _this); });
        this.set(move.to, piece);
        this._board.delete(move.from.toNum());
    };
    Board.prototype.getKingSquare = function (color) {
        var _a, _b;
        return color === color_1.default.WHITE ? (_a = this._wKing.king) === null || _a === void 0 ? void 0 : _a.context.loc : (_b = this._bKing.king) === null || _b === void 0 ? void 0 : _b.context.loc;
    };
    Object.defineProperty(Board.prototype, "board", {
        get: function () {
            return this._board;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Board.prototype, "wKing", {
        get: function () {
            return this._wKing;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Board.prototype, "bKing", {
        get: function () {
            return this._bKing;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Board.prototype, "moveData", {
        get: function () {
            return this._moveData;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Board.prototype, "enPassantData", {
        get: function () {
            return this._enPassantData;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Board.prototype, "checkData", {
        get: function () {
            return this._checkData;
        },
        enumerable: false,
        configurable: true
    });
    return Board;
}());
exports.default = Board;
