"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chessc_1 = require("../chessc");
var Rook = /** @class */ (function () {
    function Rook() {
        // Private constructor to prevent direct instantiation
    }
    Rook.prototype.getName = function () {
        return 'Rook';
    };
    Rook.prototype.getMovables = function (context) {
        return (0, chessc_1.perpendicularIteration)(context); // perpendicular iteration guarantees all result are inside checkerPiece.
    };
    Rook.prototype.getThreats = function (context) {
        return (0, chessc_1.perpendicularIteration)(context.cloneUncolored()); // perpendicular iteration but its ignoring colors.
    };
    Rook.prototype.isInRange = function (context, target) {
        var result = context.loc.diff(target);
        return result.isRightPerpendicular() ? result : null;
    };
    Rook.prototype.areThereObstacles = function (context, target) {
        return (0, chessc_1.areThereObstaclesLinearly)(context, target, this.isInRange(context, target));
    };
    Rook.prototype.canMove = function (context, target) {
        if (this.isInRange(context, target) == null)
            return false;
        return !this.areThereObstacles(context, target);
    };
    Rook.prototype.doesThreat = function (context, target) {
        if (this.isInRange(context, target) == null)
            return false;
        return !this.areThereObstacles(context.cloneUncolored(), target);
    };
    Rook.prototype.isRayTracer = function () {
        return true;
    };
    Rook.instance = new Rook();
    return Rook;
}());
exports.default = Rook;
