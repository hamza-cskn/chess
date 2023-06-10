"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var color_1 = require("../color");
var GameManager = /** @class */ (function () {
    function GameManager(board) {
        this.board = board;
        this.turn = color_1.default.WHITE;
        this.playing = false;
    }
    /**
     * Event of the start. This method is triggered when the game starts.
     */
    GameManager.prototype.onStart = function () {
    };
    /**
     * Event of finish. This method is triggered when;
     * One color checkmated,
     * One color has timed out,
     * There is not enough material left to checkmate,
     * One color aborted/resigned the game.
     */
    // todo - time out
    // todo - encapsulation for events
    // todo - reason of finish
    GameManager.prototype.onFinish = function () {
    };
    /**
     * Event of check. This method is triggered when one checkerPiece begins to
     * threaten its opponent threatenedKing.
     *
     * @param checkData CheckData
     */
    GameManager.prototype.onCheck = function (checkData) {
    };
    /**
     * Calculates all possible legal moves of checkerPiece at anywhere.
     * @param square square of the checkerPiece.
     */
    GameManager.prototype.getLegalMoves = function (square) {
        var _a;
        return ((_a = this.board.get(square)) === null || _a === void 0 ? void 0 : _a.getMovables()) || [];
    };
    /**
     * Can move method to verify moves. The game object uses this method to allow
     * overriding can move method.
     *
     * @param move
     */
    GameManager.prototype.canMove = function (move) {
        var piece = this.board.get(move.from);
        if (piece == null) {
            console.log('No checkerPiece found: ' + move.from.toString());
            return false;
        }
        if (piece.context.color !== this.getTurn()) {
            console.log('The checkerPiece at ' + move.from.toString() + ' does not belong to ' + (this.getTurn() === color_1.default.WHITE ? 'white' : 'black') + '.');
            return false;
        }
        return piece.canMove(move.to);
    };
    /**
     * Getter method to learn current turn of the game.
     */
    GameManager.prototype.getTurn = function () {
        return this.turn;
    };
    /**
     * Setter method to change the turn.
     * @param turn next turn
     */
    GameManager.prototype.setTurn = function (turn) {
        this.turn = turn;
    };
    /**
     * isPlaying method to check if game continues or not.
     */
    GameManager.prototype.isPlaying = function () {
        return this.playing;
    };
    /**
     * setPlaying method to mark game ended or started.
     */
    GameManager.prototype.setPlaying = function (state) {
        this.playing = state;
    };
    return GameManager;
}());
exports.default = GameManager;
