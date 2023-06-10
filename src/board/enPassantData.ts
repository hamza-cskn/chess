import Move from "../game/move";
import {MoveListener} from "./moveListener";
import Color from "../color";
import Board from "./board";
import Piece from "../pieces/piece";

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