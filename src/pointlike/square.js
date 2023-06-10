"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vector_1 = require("./vector");
var Square = /** @class */ (function () {
    function Square(x, y) {
        this.x = x;
        this.y = y;
    }
    Square.fromString = function (str) {
        return new Square('abcdefgh'.indexOf(str[0]), parseInt(str[1]) - 1); // a1 -> 0,0 that's why we decrease
    };
    Square.prototype.toString = function () {
        if (!this.isInsideBoard())
            return this.x + ',' + this.y;
        return 'abcdefgh'.charAt(this.x) + (this.y + 1);
    };
    Square.fromNum = function (num) {
        return new Square(num % 8, Math.floor(num / 8));
    };
    Square.prototype.toNum = function () {
        if (!this.isInsideBoard())
            return -1;
        return this.x + this.y * 8;
    };
    Square.areLinear = function (squares) {
        for (var i = squares.length - 2; i >= 0; i--) {
            if (!squares[i].diff(squares[i + 1]).isLinear()) {
                return false;
            }
        }
        return true;
    };
    Square.isBetween = function (loc1, loc2, locBetween) {
        // assume loc1 and loc2 are linear.
        return Math.min(loc1.x, loc2.x) < locBetween.x &&
            Math.max(loc1.x, loc2.x) > locBetween.x &&
            Math.min(loc1.y, loc2.y) < locBetween.y &&
            Math.max(loc1.y, loc2.y) > locBetween.y;
    };
    Square.prototype.equals = function (other) {
        return this.x === other.x && this.y === other.y;
    };
    Square.prototype.isInsideBoard = function () {
        return this.x <= 7 && this.y <= 7 && this.x >= 0 && this.y >= 0;
    };
    Square.prototype.diff = function (square) {
        return new vector_1.default(this.x - square.x, this.y - square.y);
    };
    Square.prototype.add = function (x, y) {
        return new Square(this.x + x, this.y + y);
    };
    return Square;
}());
exports.default = Square;
