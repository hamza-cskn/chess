"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var square_1 = require("../pointlike/square");
/**
 * You can call it halfmove.
 */
var Move = /** @class */ (function () {
    function Move(from, to) {
        this.from = from;
        this.to = to;
    }
    /**
     * @param str move with format of "from to". (eg. "b1 b2", "g7 g8")
     */
    Move.fromString = function (str) {
        var _a = __read(str.split(' '), 2), from = _a[0], to = _a[1];
        return Move.fromSquares(square_1.default.fromString(from), square_1.default.fromString(to));
    };
    Move.fromSquares = function (from, to) {
        return new Move(from, to);
    };
    Move.prototype.toString = function () {
        return this.from.toString() + ' ' + this.to.toString();
    };
    return Move;
}());
exports.default = Move;
