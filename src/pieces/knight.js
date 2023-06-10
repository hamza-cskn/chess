"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vector_1 = require("../pointlike/vector");
var Knight = /** @class */ (function () {
    function Knight() {
        // Private constructor to prevent direct instantiation
    }
    Knight.prototype.getName = function () {
        return 'Knight';
    };
    Knight.prototype.getMovables = function (context) {
        // todo - check is the possible move starts a new threat to the threatenedKing?
        return this.getThreats(context).filter(function (loc) {
            var piece = context.board.get(loc);
            return (piece == null) || piece.context.color !== context.color;
        });
    };
    Knight.prototype.getThreats = function (context) {
        return [
            context.loc.add(1, 2),
            context.loc.add(1, -2),
            context.loc.add(2, 1),
            context.loc.add(2, -1),
            context.loc.add(-1, -2),
            context.loc.add(-1, 2),
            context.loc.add(-2, -1),
            context.loc.add(-2, 1)
        ].filter(function (loc) { return loc.isInsideBoard(); });
    };
    Knight.prototype.isInRange = function (context, target) {
        var xDiff = Math.abs(context.loc.x - target.x);
        var yDiff = Math.abs(context.loc.y - target.y);
        if ((xDiff === 2 && yDiff === 1) || (xDiff === 1 && yDiff === 2)) {
            return new vector_1.default(context.loc.x - target.x, context.loc.y - target.y);
        }
        return null;
    };
    Knight.prototype.areThereObstacles = function (context, target) {
        var _a;
        // if target is same color with the knight, target is an obstacle.
        return ((_a = context.board.get(target)) === null || _a === void 0 ? void 0 : _a.context.color) === context.color;
    };
    Knight.prototype.canMove = function (context, target) {
        if (this.isInRange(context, target) == null)
            return false;
        return !this.areThereObstacles(context, target);
    };
    Knight.prototype.doesThreat = function (context, target) {
        return this.isInRange(context, target) !== null;
        // colors are ignored
    };
    Knight.prototype.isRayTracer = function () {
        return false;
    };
    Knight.instance = new Knight();
    return Knight;
}());
exports.default = Knight;
