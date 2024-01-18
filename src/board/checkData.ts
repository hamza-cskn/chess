import {MoveListener} from "./moveListener.ts";
import Color from "../color.ts";
import Util from "../util.ts";
import Move from "../game/move.ts";
import Piece from "../pieces/piece.ts";
import Board from "./board.ts";

export class CheckData implements MoveListener {
    private _color: Color | null = null;
    private _move: Move | null = null;
    private _checkerPiece: Piece | null = null;
    private _threatenedKing: Piece | null = null;

    public isChecked():boolean {
        return this.checkerPiece !== null;
    }

    get color(): Color | null {
        return this._color
    }

    get move(): Move | null {
        return this._move
    }

    get checkerPiece(): Piece | null {
        return this._checkerPiece
    }

    get threatenedKing(): Piece | null {
        return this._threatenedKing
    }

    public onMove(piece: Piece, move: Move, color: Color, board: Board): void {
        const opponentColor: Color = color === Color.WHITE ? Color.BLACK : Color.WHITE;
        const kingPiece = board.get(board.getKingSquare(opponentColor));
        if (kingPiece != null && Util.isThereThreaten(kingPiece?.context)) {
            this._color = color;
            this._move = move;
            this._checkerPiece = piece;
            this._threatenedKing = kingPiece;
        } else {
            this._color = null;
            this._move = null;
            this._checkerPiece = null;
            this._threatenedKing = null;
        }
    }
}