import Move from "../game/move.ts";
import Color from "../color.ts";
import {MoveListener} from "./moveListener.ts";
import Piece from "../pieces/piece.ts";
import Board from "./board.ts";

export class MoveData implements MoveListener {
    private _halfmoveCounter: number = 0;
    private _moves: Move[] = []

    get moves(): Move[] {
        return this._moves;
    }

    get halfmoveCounter(): number {
        return this._halfmoveCounter;
    }

    set halfmoveCounter(value: number) {
        this._halfmoveCounter = value;
    }

    public onMove(piece: Piece, move: Move, color: Color, board: Board): void {
        this._moves.push(move);
        const pieceTaken = board.get(move.to);
        if (pieceTaken) {
            this._halfmoveCounter = 0;
        } else {
            this._halfmoveCounter++;
        }
    }
}