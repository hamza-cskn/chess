"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var gameManager_1 = require("../game/gameManager");
var move_1 = require("../game/move");
var square_1 = require("../pointlike/square");
var color_1 = require("../color");
var readlineSync = require('readline-sync');
var CliGameImpl = /** @class */ (function (_super) {
    __extends(CliGameImpl, _super);
    function CliGameImpl(board) {
        return _super.call(this, board) || this;
    }
    CliGameImpl.prototype.onCheck = function (checkData) {
        // @ts-ignore
        console.log((checkData.color === color_1.default.WHITE ? 'White' : 'Black') === +' checked with ' + checkData.move.toString() + ' by a ' + checkData.piece.type.getName());
    };
    CliGameImpl.prototype.onTurn = function () {
        this.printBoard([]);
        console.log("To make a move: '<from> <to>' (e.g: 'e2 e4')");
        console.log("To see legal moves: '<square>' (e.g: 'e2')");
        console.log('Move turn is ' + (this.getTurn() === color_1.default.WHITE ? 'White' : 'Black') + '!\n');
        while (true) {
            var input = readlineSync.question('\x1b[33mEnter input: ');
            if (input.length === 5) {
                var move = move_1.default.fromString(input);
                if (this.canMove(move)) {
                    return move;
                }
                console.log('Invalid move. Please try again.');
            }
            else if (input.length === 2) {
                console.time('legalMoveCalculation');
                var legalMoves = _super.prototype.getLegalMoves.call(this, square_1.default.fromString(input));
                console.timeEnd('legalMoveCalculation');
                this.printBoard(legalMoves);
            }
        }
    };
    CliGameImpl.prototype.printBoard = function (movableSquares) {
        for (var row = 7; row >= 0; row--) {
            var line = '\x1b[31m' + (row + 1) + ' ';
            for (var column = 0; column < 8; column++) {
                line += this.getFormattedSquareAt(new square_1.default(column, row), movableSquares);
            }
            console.log(line);
        }
        console.log('\x1b[31m   a  b  c  d  e  f  g  h\x1b[0m');
    };
    CliGameImpl.prototype.getFormattedSquareAt = function (loc, movableSquares) {
        var backgroundColor = this.getSquareBackgroundColor(loc);
        var foregroundColor = this.getSquareForegroundColor(loc);
        var content = ' ' + this.getSquareTextAt(loc);
        if (this.valueIncludes(movableSquares, loc)) {
            backgroundColor = '\x1b[42m';
        }
        return backgroundColor + foregroundColor + content + '\x1b[0m'; /* reset */
    };
    CliGameImpl.prototype.xor = function (a, b) {
        return (a && !b) || (!a && b);
    };
    CliGameImpl.prototype.getSquareBackgroundColor = function (loc) {
        if (this.xor(loc.y % 2 !== 0, loc.x % 2 !== 0)) // xor
         {
            return '\x1b[48;5;240m';
        } // black
        else {
            return '\x1b[48;5;15m';
        } // white
    };
    CliGameImpl.prototype.getSquareForegroundColor = function (loc) {
        var piece = this.board.get(loc);
        if (piece != null) {
            if (piece.context.color === color_1.default.WHITE) {
                return '\x1b[36m';
            }
            else {
                return '\x1b[34m';
            }
        }
        else {
            if (this.xor(loc.y % 2 !== 0, loc.x % 2 !== 0)) // xor
             {
                return '\x1b[30m';
            } // black
            else {
                return '\x1b[37m';
            } // white
        }
    };
    CliGameImpl.prototype.getPieceUnicode = function (piecetype, color) {
        if (color === color_1.default.WHITE) {
            return CliGameImpl.whitePieceUnicodes.get(piecetype.getName()) || '?';
        }
        else {
            return CliGameImpl.blackPieceUnicodes.get(piecetype.getName()) || '?';
        }
    };
    CliGameImpl.prototype.getSquareTextAt = function (loc) {
        var piece = this.board.get(loc);
        if (piece != null) {
            return this.getPieceUnicode(piece.type, piece.context.color) + ' ';
        }
        return loc.toString();
    };
    CliGameImpl.prototype.valueIncludes = function (array, value) {
        if (!array)
            return false;
        if (array.length === 0)
            return false;
        return array.some(function (element) {
            return JSON.stringify(element) === JSON.stringify(value);
        });
    };
    CliGameImpl.whitePieceUnicodes = new Map();
    CliGameImpl.blackPieceUnicodes = new Map();
    (function () {
        CliGameImpl.whitePieceUnicodes.set('King', '♔');
        CliGameImpl.whitePieceUnicodes.set('Queen', '♕');
        CliGameImpl.whitePieceUnicodes.set('Bishop', '♗');
        CliGameImpl.whitePieceUnicodes.set('Knight', '♘');
        CliGameImpl.whitePieceUnicodes.set('Rook', '♖');
        CliGameImpl.whitePieceUnicodes.set('Pawn', '♙');
        CliGameImpl.blackPieceUnicodes.set('King', '♚');
        CliGameImpl.blackPieceUnicodes.set('Queen', '♛');
        CliGameImpl.blackPieceUnicodes.set('Bishop', '♝');
        CliGameImpl.blackPieceUnicodes.set('Knight', '♞');
        CliGameImpl.blackPieceUnicodes.set('Rook', '♜');
        CliGameImpl.blackPieceUnicodes.set('Pawn', '♟');
    })();
    return CliGameImpl;
}(gameManager_1.default));
exports.default = CliGameImpl;
