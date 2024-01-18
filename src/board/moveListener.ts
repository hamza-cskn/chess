import Piece from "../pieces/piece.ts";
import Move from "../game/move.ts";
import Color from "../color.ts";
import Board from "./board.ts";

export interface MoveListener {
    /**
     * @param piece the moving piece.
     * @param move the move data.
     * @param color color of the moving piece.
     * @param board the chessboard.
     */
    onMove(piece: Piece, move: Move, color: Color, board: Board): void;

}