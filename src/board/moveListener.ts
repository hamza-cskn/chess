import Piece from "../pieces/piece";
import Move from "../game/move";
import Color from "../color";
import Board from "./board";

export interface MoveListener {
    /**
     * @param piece the moving piece.
     * @param move the move data.
     * @param color color of the moving piece.
     * @param board the chessboard.
     */
    onMove(piece: Piece, move: Move, color: Color, board: Board): void;

}