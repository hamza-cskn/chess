import Square from '../pointlike/square'

/**
 * You can call it halfmove.
 */
class Move {
    public readonly to!: Square
    public readonly from!: Square

    private constructor(from: Square, to: Square) {
        this.from = from
        this.to = to
    }

    /**
     * @param str move with format of "from to". (eg. "b1 b2", "g7 g8")
     */
    public static fromString(str: string): Move {
        const [from, to] = str.split(' ')
        return Move.fromSquares(Square.fromString(from), Square.fromString(to))
    }

    public static fromSquares(from: Square, to: Square): Move {
        return new Move(from, to)
    }

    public toString(): string {
        return this.from.toString() + ' ' + this.to.toString()
    }
}

export default Move
