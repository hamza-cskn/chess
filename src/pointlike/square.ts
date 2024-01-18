import Pointlike from './pointlike.ts'
import Vector from './vector.ts'

export default class Square implements Pointlike {
    public readonly x: number
    public readonly y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    public static fromString(str: string): Square {
        return new Square('abcdefgh'.indexOf(str[0]), parseInt(str[1]) - 1) // a1 -> 0,0 that's why we decrease
    }

    public toString() {
        if (!this.isInsideBoard()) return this.x + ',' + this.y
        return 'abcdefgh'.charAt(this.x) + (this.y + 1)
    }

    public static fromNum(num: number): Square {
        return new Square(num % 8, Math.floor(num / 8))
    }

    public toNum() {
        if (!this.isInsideBoard()) return -1
        return this.x + this.y * 8
    }

    public static areLinear(squares: Square[]): boolean {
        for (let i: number = squares.length - 2; i >= 0; i--) {
            if (!squares[i].diff(squares[i + 1]).isLinear()) {
                return false
            }
        }
        return true
    }

    public static isBetween(loc1: Square, loc2: Square, locBetween: Square): boolean {
        // assume loc1 and loc2 are linear.
        return Math.min(loc1.x, loc2.x) < locBetween.x &&
            Math.max(loc1.x, loc2.x) > locBetween.x &&
            Math.min(loc1.y, loc2.y) < locBetween.y &&
            Math.max(loc1.y, loc2.y) > locBetween.y
    }

    public equals(other: Square): boolean {
        return this.x === other.x && this.y === other.y
    }

    public isInsideBoard() {
        return this.x <= 7 && this.y <= 7 && this.x >= 0 && this.y >= 0
    }

    public diff(square: Square): Vector {
        return new Vector(this.x - square.x, this.y - square.y)
    }

    public add(x: number, y: number): Square {
        return new Square(this.x + x, this.y + y)
    }
}
