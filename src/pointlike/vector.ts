import Pointlike from './pointlike.ts'

class Vector implements Pointlike {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    public static cloneNormalized(vector: Vector): Vector {
        const result: Vector = new Vector(vector.x, vector.y)
        result.normalize()
        return result
    }

    public static cloneReversed(vector: Vector): Vector {
        return new Vector(vector.x * -1, vector.y * -1)
    }

    /**
     * @returns itself
     */
    public abs(): Vector {
        return new Vector(Math.abs(this.x), Math.abs(this.y))
    }

    public normalize(): void {
        this.x = this.x > 0 ? 1 : this.x === 0 ? 0 : -1
        this.y = this.y > 0 ? 1 : this.y === 0 ? 0 : -1
    }

    public sum(vector: Vector): void {
        this.x += vector.x
        this.y += vector.y
    }

    public multiply(vector: Vector): void {
        this.x *= vector.x
        this.y *= vector.y
    }

    public isZero(): boolean {
        return this.x === 0 && this.y === 0
    }

    public isLinear(): boolean {
        if (this.isZero()) return false
        return this.isRightCross() || this.isRightPerpendicular()
    }

    public isRightCross(): boolean {
        return this.x === this.y || this.x === -this.y
    }

    public isRightPerpendicular(): boolean {
        return this.x === 0 || this.y === 0
    }

    public equals(vector: Vector): boolean {
        return this.x === vector.x && this.y === vector.y
    }
}

export default Vector
