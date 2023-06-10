"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chessc_1 = require("../chessc");
var Bishop = /** @class */ (function () {
    function Bishop() {
        // Private constructor to prevent direct instantiation
    }
    Bishop.prototype.getName = function () {
        return 'Bishop';
    };
    Bishop.prototype.getMovables = function (context) {
        return (0, chessc_1.crossIteration)(context); // cross iteration guarantees all result are inside checkerPiece.
    };
    Bishop.prototype.getThreats = function (context) {
        return (0, chessc_1.crossIteration)(context.cloneUncolored()); // cross iteration but its ignoring colors.
    };
    Bishop.prototype.isInRange = function (context, target) {
        var result = context.loc.diff(target);
        return result.isRightCross() ? result : null;
    };
    Bishop.prototype.areThereObstacles = function (context, target) {
        return (0, chessc_1.areThereObstaclesLinearly)(context, target, this.isInRange(context, target));
    };
    Bishop.prototype.canMove = function (context, target) {
        if (this.isInRange(context, target) == null)
            return false;
        return !this.areThereObstacles(context, target);
    };
    Bishop.prototype.doesThreat = function (context, target) {
        if (this.isInRange(context, target) == null)
            return false;
        return !this.areThereObstacles(context.cloneUncolored(), target);
    };
    Bishop.prototype.isRayTracer = function () {
        return true;
    };
    Bishop.instance = new Bishop();
    return Bishop;
}());
exports.default = Bishop;
