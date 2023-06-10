"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chessContext_1 = require("./chessContext");
var checkproxy_1 = require("./check/checkproxy");
var Piece = /** @class */ (function () {
    function Piece(board, type, loc, color) {
        this.context = new chessContext_1.default(board, loc, color);
        this.type = new checkproxy_1.default(type);
    }
    Piece.prototype.getMovables = function () {
        return this.type.getMovables(this.context);
    };
    Piece.prototype.getThreats = function () {
        return this.type.getThreats(this.context);
    };
    Piece.prototype.isInRange = function (target) {
        return this.type.isInRange(this.context, target);
    };
    Piece.prototype.areThereObstacles = function (target) {
        return this.type.areThereObstacles(this.context, target);
    };
    Piece.prototype.canMove = function (target) {
        return this.type.canMove(this.context, target);
    };
    Piece.prototype.doesThreat = function (target) {
        if (target.equals(this.context.loc))
            return false;
        return this.type.doesThreat(this.context, target);
    };
    return Piece;
}());
exports.default = Piece;
