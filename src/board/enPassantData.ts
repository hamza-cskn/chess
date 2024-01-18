import Move from "../game/move.ts";
import {MoveListener} from "./moveListener.ts";
import Color from "../color.ts";
import Board from "./board.ts";
import Piece from "../pieces/piece.ts";

export class EnPassantData implements MoveListener {
    private _move: Move | null = null;

    get move(): Move | null {
        return this._move
    }

    public onMove(piece: Piece, move: Move, color: Color, board: Board): void {
        if (piece.type.getName() === 'Pawn' && Math.abs(move.from.y - move.to.y) === 2) {
            this._move = move;
        } else {
            this._move = null;
        }
    }
}