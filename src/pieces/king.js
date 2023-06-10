"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chessContext_1 = require("./chessContext");
var vector_1 = require("../pointlike/vector");
var util_1 = require("../util");
var King = /** @class */ (function () {
    function King() {
        // Private constructor to prevent direct instantiation
    }
    King.prototype.getName = function () {
        return 'King';
    };
    King.prototype.getMovables = function (context) {
        // todo - castling
        // todo - prevent moving to frames threatened
        return this.getThreats(context)
            .filter(function (l) {
            var piece = context.board.get(l);
            return (piece == null) || piece.context.color !== context.color;
        }).filter(function (l) { return !util_1.default.isThereThreaten(new chessContext_1.default(context.board, l, context.color)); }); // filter threaten squares
    };
    King.prototype.getThreats = function (context) {
        return [
            context.loc.add(1, 1),
            context.loc.add(1, 0),
            context.loc.add(1, -1),
            context.loc.add(0, 1),
            context.loc.add(0, -1),
            context.loc.add(-1, 1),
            context.loc.add(-1, 0),
            context.loc.add(-1, -1)
        ]
            .filter(function (loc) { return loc.isInsideBoard(); });
    };
    King.prototype.isInRange = function (context, target) {
        var xDiff = Math.abs(context.loc.x - target.x);
        var yDiff = Math.abs(context.loc.y - target.y);
        if (xDiff <= 1 && yDiff <= 1) { // assume not xDiff === yDiff === 0
            return new vector_1.default(context.loc.x - target.x, context.loc.y - target.y);
        }
        return null;
    };
    King.prototype.areThereObstacles = function (context, target) {
        var _a;
        // if target is same color with the knight, target is an obstacle.
        return ((_a = context.board.get(target)) === null || _a === void 0 ? void 0 : _a.context.color) === context.color;
    };
    King.prototype.canMove = function (context, target) {
        return this.getMovables(context).find(function (l) { return target.equals(l); }) !== undefined;
    };
    King.prototype.doesThreat = function (context, target) {
        if (this.isInRange(context, target) == null)
            return false;
        return !this.areThereObstacles(context.cloneUncolored(), target);
    };
    King.prototype.isRayTracer = function () {
        return false;
    };
    King.instance = new King();
    return King;
}());
exports.default = King;
