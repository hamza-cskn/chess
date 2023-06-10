"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chessc_1 = require("../chessc");
var Queen = /** @class */ (function () {
    function Queen() {
        // Private constructor to prevent direct instantiation
    }
    Queen.prototype.getName = function () {
        return 'Queen';
    };
    Queen.prototype.getMovables = function (context) {
        // todo - check is the possible move starts a new threat to the threatenedKing?
        return (0, chessc_1.crossIteration)(context).concat((0, chessc_1.perpendicularIteration)(context));
    };
    Queen.prototype.getThreats = function (context) {
        return (0, chessc_1.crossIteration)(context.cloneUncolored()).concat((0, chessc_1.perpendicularIteration)(context.cloneUncolored()));
    };
    Queen.prototype.isInRange = function (context, target) {
        var result = context.loc.diff(target);
        return result.isLinear() ? result : null;
    };
    Queen.prototype.areThereObstacles = function (context, target) {
        return (0, chessc_1.areThereObstaclesLinearly)(context, target, this.isInRange(context, target));
    };
    Queen.prototype.canMove = function (context, target) {
        if (this.isInRange(context, target) == null)
            return false;
        return !this.areThereObstacles(context, target);
    };
    Queen.prototype.doesThreat = function (context, target) {
        if (this.isInRange(context, target) == null)
            return false;
        return !this.areThereObstacles(context.cloneUncolored(), target);
    };
    Queen.prototype.isRayTracer = function () {
        return true;
    };
    Queen.instance = new Queen();
    return Queen;
}());
exports.default = Queen;
