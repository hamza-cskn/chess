import Board from '../board/board'
import Color from '../color'
import Move from './move'
import Square from '../pointlike/square'
import Piece from '../pieces/piece'
import {CheckData} from "../board/checkData";

abstract class GameManager {
    public readonly board!: Board
    private playing: boolean
    private turn!: Color

    public constructor(board: Board) {
        this.board = board
        this.turn = Color.WHITE
        this.playing = false
    }

    /**
     * Event of the start. This method is triggered when the game starts.
     */
    public onStart(): void {

    }

    /**
     * Event of finish. This method is triggered when;
     * One color checkmated,
     * One color has timed out,
     * There is not enough material left to checkmate,
     * One color aborted/resigned the game.
     */
    // todo - time out
    // todo - encapsulation for events
    // todo - reason of finish
    public onFinish(): void {

    }

    /**
     * Event of check. This method is triggered when one checkerPiece begins to
     * threaten its opponent threatenedKing.
     *
     * @param checkData CheckData
     */
    public onCheck(checkData: CheckData): void {

    }

    /**
     * Calculates all possible legal moves of checkerPiece at anywhere.
     * @param square square of the checkerPiece.
     */
    public getLegalMoves(square: Square): Square[] {
        return this.board.get(square)?.getMovables() || []
    }

    /**
     * Event of turn. GameManager class have to provide Move input from user.
     * You have to verify legality of the Move. Checkout canMove() method.
     */
    abstract onTurn(): Move

    /**
     * Can move method to verify moves. The game object uses this method to allow
     * overriding can move method.
     *
     * @param move
     */
    public canMove(move: Move): boolean {
        const piece: Piece | undefined = this.board.get(move.from)
        if (piece == null) {
            console.log('No checkerPiece found: ' + move.from.toString())
            return false
        }
        if (piece.context.color !== this.getTurn()) {
            console.log('The checkerPiece at ' + move.from.toString() + ' does not belong to ' + (this.getTurn() === Color.WHITE ? 'white' : 'black') + '.')
            return false
        }
        return piece.canMove(move.to)
    }

    /**
     * Getter method to learn current turn of the game.
     */
    public getTurn(): Color {
        return this.turn
    }

    /**
     * Setter method to change the turn.
     * @param turn next turn
     */
    public setTurn(turn: Color): void {
        this.turn = turn
    }

    /**
     * isPlaying method to check if game continues or not.
     */
    public isPlaying(): boolean {
        return this.playing
    }

    /**
     * setPlaying method to mark game ended or started.
     */
    public setPlaying(state: boolean): void {
        this.playing = state
    }
}

export default GameManager
