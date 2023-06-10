import Square from '../pointlike/square'
import Piece from '../pieces/piece'
import Color from '../color'
import Move from '../game/move'
import {MoveListener} from "./moveListener";
import {KingData} from "./kingData";
import {MoveData} from "./moveData";
import {EnPassantData} from "./enPassantData";
import {CheckData} from "./checkData";

export default class Board {
    private readonly _board: Map<number, Piece>
    private _wKing: KingData = new KingData();
    private _bKing: KingData = new KingData(); //todo check scenarios that kings does not exist.
    private _moveData: MoveData = new MoveData(); //todo responsibility of the data belong to game class
    private _enPassantData: EnPassantData = new EnPassantData(); //todo responsibility of the data belong to game class
    private _checkData: CheckData = new CheckData();

    private readonly _moveListeners: MoveListener[] = [
        this._wKing,
        this._bKing,
        this._moveData,
        this._enPassantData,
        this._checkData
    ]

    public constructor() {
        this._board = new Map<number, Piece>()
    }

    public forEach(each: (loc: number, piece: Piece) => void): void {
        this._board.forEach((p, s) => each(s, p))
    }

    get moveListeners(): MoveListener[] {
        return this._moveListeners;
    }

    public set(square: Square, piece: Piece): void {
        if (!square.isInsideBoard()) throw Error('checkerPiece cannot be outside board.')
        this._board.set(square.toNum(), piece)
        piece.context.loc = square

        if (piece.type.getName() === "King") {
            const king = piece.context.color === Color.WHITE ? this._wKing : this._bKing;
            king.king = piece;
        }
    }

    public get(square: Square | undefined): Piece | undefined {
        if (square == null) return undefined
        return this._board.get(square.toNum())
    }

    public applyMove(move: Move): void {
        const piece: Piece | undefined = this.get(move.from)
        if (piece == null) throw Error('no checkerPiece found at ' + move.from.toString())

        this._moveListeners.forEach((listener: MoveListener) => listener.onMove(piece, move, piece.context.color!, this));
        this.set(move.to, piece);
        this._board.delete(move.from.toNum());
    }

    public getKingSquare(color: Color | null): Square | undefined {
        return color === Color.WHITE ? this._wKing.king?.context.loc : this._bKing.king?.context.loc;
    }

    get board(): Map<number, Piece> {
        return this._board;
    }

    get wKing(): KingData {
        return this._wKing;
    }

    get bKing(): KingData {
        return this._bKing;
    }

    get moveData(): MoveData {
        return this._moveData;
    }

    get enPassantData(): EnPassantData {
        return this._enPassantData;
    }

    get checkData(): CheckData {
        return this._checkData;
    }
}
