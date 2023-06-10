import Color from '../color'
import GameManager from './gameManager'
import Move from './move'

export default class Game {
    manager: GameManager

    public constructor(manager: GameManager) {
        this.manager = manager
    }

    public start(): void {
        /*
            this.manager.board.set(Square.fromString("h2"), new Piece(this.manager.board, Bishop.instance, Square.fromString("h2"), Color.BLACK));
            this.manager.board.set(Square.fromString("c5"), new Piece(this.manager.board, Bishop.instance, Square.fromString("c5"), Color.BLACK));
            this.manager.board.set(Square.fromString("c4"), new Piece(this.manager.board, Rook.instance, Square.fromString("c4"), Color.BLACK));
            this.manager.board.set(Square.fromString("e4"), new Piece(this.manager.board, Knight.instance, Square.fromString("e4"), Color.BLACK));
            this.manager.board.set(Square.fromString("a4"), new Piece(this.manager.board, Queen.instance, Square.fromString("a4"), Color.BLACK));
            this.manager.board.set(Square.fromString("f7"), new Piece(this.manager.board, Pawn.instance, Square.fromString("f7"), Color.BLACK));
            this.manager.board.set(Square.fromString("b5"), new Piece(this.manager.board, Rook.instance, Square.fromString("b5"), Color.WHITE));
            this.manager.board.set(Square.fromString("d5"), new Piece(this.manager.board, King.instance, Square.fromString("d5"), Color.WHITE));
            this.manager.board.set(Square.fromString("h1"), new Piece(this.manager.board, King.instance, Square.fromString("h1"), Color.BLACK));
    */
        this.manager.onStart()
        this.manager.setPlaying(true)
        let move: Move
        do {
            move = this.manager.onTurn()
            this.manager.board.applyMove(move)
            if (this.manager.board.checkData.checkerPiece) {
                this.manager.onCheck(this.manager.board.checkData)
            }
            this.manager.setTurn(this.manager.getTurn() === Color.WHITE ? Color.BLACK : Color.WHITE)
        } while (this.manager.isPlaying())
    }

    isFinished() {

    }
}
