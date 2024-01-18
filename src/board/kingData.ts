import {MoveListener} from "./moveListener.ts";
import Color from "../color.ts";
import Square from "../pointlike/square.ts";
import Move from "../game/move.ts";
import Piece from "../pieces/piece.ts";
import Board from "./board.ts";

export class KingData implements MoveListener {
    private _king: Piece | undefined = undefined
    private readonly _castling: CastlingData = new CastlingData()

    get king(): Piece | undefined {
        return this._king;
    }

    set king(value: Piece | undefined) {
        this._king = value;
    }

    get castling(): CastlingData {
        return this._castling
    }

    public onMove(piece: Piece, move: Move, color: Color, board: Board): void {
        if (piece.type.getName() === 'King') {
            this.castling.both(false)
            return
        }

        if (piece.type.getName() === 'Rook') {
            if (piece.context.color === Color.WHITE) {
                if (move.from.equals(Square.fromString('a1'))) {
                    this.castling.long = false
                } else if (move.from.equals(Square.fromString('h1'))) {
                    this.castling.short = false
                }
            } else {
                if (move.from.equals(Square.fromString('a8'))) {
                    this.castling.long = false
                } else if (move.from.equals(Square.fromString('h8'))) {
                    this.castling.short = false
                }
            }
        }
    }
}

export class CastlingData {
    private _long: boolean = true
    private _short: boolean = true

    get short(): boolean {
        return this._short
    }

    set short(value: boolean) {
        this._short = value
    }

    get long(): boolean {
        return this._long
    }

    set long(value: boolean) {
        this._long = value
    }

    public both(value: boolean): void {
        this.long = value
        this.short = value
    }
}