"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var square_1 = require("../../pointlike/square");
var vector_1 = require("../../pointlike/vector");
var chessc_1 = require("../../chessc");
/**
 * Purpose of this class is acting like a PieceType. However, it adds
 * one behavior change and modifies methods to obeying rule of chess:
 * No checkerPiece can move anywhere that would allow threatening its threatenedKing.
 */
var CheckProxy = /** @class */ (function () {
    function CheckProxy(handler) {
        this.handler = handler;
    }
    CheckProxy.prototype.getName = function () {
        return this.handler.getName();
    };
    CheckProxy.prototype.canMove = function (context, target) {
        return this.handler.canMove(context, target) &&
            this.isLegalForCheck(context, target) &&
            !this.doesOpenThreaten(context, target);
    };
    CheckProxy.prototype.isLegalForCheck = function (context, target) {
        var checkData = context.board.checkData;
        if (!checkData.isChecked())
            return true; // is there any check?
        // is it a basic escape move?
        if (this.handler.getName() === 'King') {
            return true;
        }
        // does take the color checkerPiece?
        if (checkData.checkerPiece.context.loc.equals(target)) {
            return true;
        }
        // if the color checkerPiece is a ray tracer (queen, rook or bishop). then the check can be blocked.
        if (checkData.checkerPiece.type.isRayTracer()) {
            // does block threatening?
            if (square_1.default.isBetween(checkData.threatenedKing.context.loc, checkData.checkerPiece.context.loc, target)) {
                return true;
            }
        }
        return false;
    };
    CheckProxy.prototype.doesOpenThreaten = function (context, target) {
        var king = context.board.get(context.board.getKingSquare(context.color));
        if (king == null)
            return false; // if there is no threatenedKing, there is no check.
        var kingDiff = context.loc.diff(king.context.loc);
        if (kingDiff.isLinear()) { // possible self open check for its threatenedKing.
            var kingDirection = vector_1.default.cloneNormalized(kingDiff);
            var targetDirection = vector_1.default.cloneNormalized(context.loc.diff(target));
            if (!kingDirection.abs().equals(targetDirection.abs())) {
                // if threatenedKing and target square are on same linear, there is no possible scenario to open check.
                var obstacle = (0, chessc_1.searchForObstaclesLinearly)(king.context.cloneUncolored(), null, vector_1.default.cloneReversed(kingDirection), [context.loc]);
                if (obstacle == null)
                    return false;
                var piece = context.board.get(obstacle);
                if (piece == null)
                    return false;
                return piece.context.color !== context.color && piece.isInRange(king.context.loc) !== null;
            }
        }
        return false;
    };
    CheckProxy.prototype.getMovables = function (context) {
        var _this = this;
        return this.handler.getMovables(context).filter(function (loc) { return _this.canMove(context, loc); });
    };
    CheckProxy.prototype.areThereObstacles = function (context, target) {
        return this.handler.areThereObstacles(context, target);
    };
    CheckProxy.prototype.doesThreat = function (context, target) {
        return this.handler.doesThreat(context, target);
    };
    CheckProxy.prototype.isInRange = function (context, target) {
        return this.handler.isInRange(context, target);
    };
    CheckProxy.prototype.getThreats = function (context) {
        return this.handler.getThreats(context);
    };
    CheckProxy.prototype.isRayTracer = function () {
        return this.handler.isRayTracer();
    };
    return CheckProxy;
}());
exports.default = CheckProxy;
