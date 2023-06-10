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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var color_1 = require("../color");
var vector_1 = require("../pointlike/vector");
var chessc_1 = require("../chessc");
var Pawn = /** @class */ (function () {
    function Pawn() {
        // Private constructor to prevent direct instantiation
    }
    Pawn.prototype.getName = function () {
        return 'Pawn';
    };
    Pawn.prototype.getMovables = function (context) {
        var result = [];
        var direction = this.getDirection(context.color);
        // add forward square if empty,
        var forward = context.loc.add(0, 1 * direction);
        if (context.board.get(forward) == null) {
            result.push(forward);
            // double step
            var twoStepForward = context.loc.add(0, 2 * direction);
            if (this.isDoubleStep(context) && (context.board.get(twoStepForward) == null)) {
                result.push(twoStepForward);
            }
        }
        // todo - en passant
        result.push.apply(result, __spreadArray([], __read(this.getThreats(context).filter(function (loc) {
            var piece = context.board.get(loc);
            return (piece != null) && piece.context.color !== context.color;
        })), false)); // add squares contains opponent and threatened
        return result.filter(function (loc) { return loc.isInsideBoard(); });
    };
    Pawn.prototype.getThreats = function (context) {
        var direction = this.getDirection(context.color);
        return [
            context.loc.add(1, 1 * direction),
            context.loc.add(-1, 1 * direction)
        ]
            .filter(function (loc) { return loc.isInsideBoard(); });
    };
    Pawn.prototype.getDirection = function (color) {
        return color === color_1.default.WHITE ? 1 : -1;
    };
    Pawn.prototype.isInRange = function (context, target) {
        var xDiff = Math.abs(target.x - context.loc.x);
        var yDiff = target.y - context.loc.y;
        if (xDiff === 1 && yDiff === 1 * this.getDirection(context.color)) {
            return new vector_1.default(context.loc.x - target.x, context.loc.y - target.y);
        }
        return null;
    };
    Pawn.prototype.isDoubleStep = function (context) {
        return (context.color === color_1.default.WHITE && context.loc.y === 1) ||
            (context.color === color_1.default.BLACK && context.loc.y === 6);
    };
    Pawn.prototype.areThereObstacles = function (context, target) {
        return (0, chessc_1.areThereObstaclesLinearly)(context, target, new vector_1.default(0, -1 * this.getDirection(context.color))) !== null; // reversed direction given because obstacle color method reverses vectors.
    };
    Pawn.prototype.canMove = function (context, target) {
        return this.getMovables(context).find(function (l) { return l.equals(target); }) !== undefined;
    };
    Pawn.prototype.doesThreat = function (context, target) {
        return this.isInRange(context.cloneUncolored(), target) !== null;
    };
    Pawn.prototype.isRayTracer = function () {
        return false;
    };
    Pawn.instance = new Pawn();
    return Pawn;
}());
exports.default = Pawn;
