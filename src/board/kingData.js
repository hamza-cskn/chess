"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CastlingData = exports.KingData = void 0;
var color_1 = require("../color");
var square_1 = require("../pointlike/square");
var KingData = /** @class */ (function () {
    function KingData() {
        this._king = undefined;
        this._castling = new CastlingData();
    }
    Object.defineProperty(KingData.prototype, "king", {
        get: function () {
            return this._king;
        },
        set: function (value) {
            this._king = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(KingData.prototype, "castling", {
        get: function () {
            return this._castling;
        },
        enumerable: false,
        configurable: true
    });
    KingData.prototype.onMove = function (piece, move, color, board) {
        if (piece.type.getName() === 'King') {
            this.castling.both(false);
            return;
        }
        if (piece.type.getName() === 'Rook') {
            if (piece.context.color === color_1.default.WHITE) {
                if (move.from.equals(square_1.default.fromString('a1'))) {
                    this.castling.long = false;
                }
                else if (move.from.equals(square_1.default.fromString('h1'))) {
                    this.castling.short = false;
                }
            }
            else {
                if (move.from.equals(square_1.default.fromString('a8'))) {
                    this.castling.long = false;
                }
                else if (move.from.equals(square_1.default.fromString('h8'))) {
                    this.castling.short = false;
                }
            }
        }
    };
    return KingData;
}());
exports.KingData = KingData;
var CastlingData = /** @class */ (function () {
    function CastlingData() {
        this._long = true;
        this._short = true;
    }
    Object.defineProperty(CastlingData.prototype, "short", {
        get: function () {
            return this._short;
        },
        set: function (value) {
            this._short = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CastlingData.prototype, "long", {
        get: function () {
            return this._long;
        },
        set: function (value) {
            this._long = value;
        },
        enumerable: false,
        configurable: true
    });
    CastlingData.prototype.both = function (value) {
        this.long = value;
        this.short = value;
    };
    return CastlingData;
}());
exports.CastlingData = CastlingData;
