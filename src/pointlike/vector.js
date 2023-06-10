"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vector = /** @class */ (function () {
    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector.cloneNormalized = function (vector) {
        var result = new Vector(vector.x, vector.y);
        result.normalize();
        return result;
    };
    Vector.cloneReversed = function (vector) {
        return new Vector(vector.x * -1, vector.y * -1);
    };
    /**
     * @returns itself
     */
    Vector.prototype.abs = function () {
        return new Vector(Math.abs(this.x), Math.abs(this.y));
    };
    Vector.prototype.normalize = function () {
        this.x = this.x > 0 ? 1 : this.x === 0 ? 0 : -1;
        this.y = this.y > 0 ? 1 : this.y === 0 ? 0 : -1;
    };
    Vector.prototype.sum = function (vector) {
        this.x += vector.x;
        this.y += vector.y;
    };
    Vector.prototype.multiply = function (vector) {
        this.x *= vector.x;
        this.y *= vector.y;
    };
    Vector.prototype.isZero = function () {
        return this.x === 0 && this.y === 0;
    };
    Vector.prototype.isLinear = function () {
        if (this.isZero())
            return false;
        return this.isRightCross() || this.isRightPerpendicular();
    };
    Vector.prototype.isRightCross = function () {
        return this.x === this.y || this.x === -this.y;
    };
    Vector.prototype.isRightPerpendicular = function () {
        return this.x === 0 || this.y === 0;
    };
    Vector.prototype.equals = function (vector) {
        return this.x === vector.x && this.y === vector.y;
    };
    return Vector;
}());
exports.default = Vector;
