import Move from "../game/move";
import Color from "../color";
import {MoveListener} from "./moveListener";
import Piece from "../pieces/piece";
import Board from "./board";

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