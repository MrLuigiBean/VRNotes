import { Vector3 } from "./math.vector";
/**
 * Class representing an isovector a vector containing 2 INTEGER coordinates
 * x axis is horizontal
 * y axis is 60 deg counter clockwise from positive y axis
 * @internal
 */
export declare class _IsoVector {
    /** defines the first coordinate */
    x: number;
    /** defines the second coordinate */
    y: number;
    /**
     * Creates a new isovector from the given x and y coordinates
     * @param x defines the first coordinate, must be an integer
     * @param y defines the second coordinate, must be an integer
     */
    constructor(
    /** defines the first coordinate */
    x?: number, 
    /** defines the second coordinate */
    y?: number);
    /**
     * Gets a new IsoVector copied from the IsoVector
     * @returns a new IsoVector
     */
    clone(): _IsoVector;
    /**
     * Rotates one IsoVector 60 degrees counter clockwise about another
     * Please note that this is an in place operation
     * @param other an IsoVector a center of rotation
     * @returns the rotated IsoVector
     */
    rotate60About(other: _IsoVector): this;
    /**
     * Rotates one IsoVector 60 degrees clockwise about another
     * Please note that this is an in place operation
     * @param other an IsoVector as center of rotation
     * @returns the rotated IsoVector
     */
    rotateNeg60About(other: _IsoVector): this;
    /**
     * For an equilateral triangle OAB with O at isovector (0, 0) and A at isovector (m, n)
     * Rotates one IsoVector 120 degrees counter clockwise about the center of the triangle
     * Please note that this is an in place operation
     * @param m integer a measure a Primary triangle of order (m, n) m > n
     * @param n >= 0 integer a measure for a Primary triangle of order (m, n)
     * @returns the rotated IsoVector
     */
    rotate120(m: number, n: number): this;
    /**
     * For an equilateral triangle OAB with O at isovector (0, 0) and A at isovector (m, n)
     * Rotates one IsoVector 120 degrees clockwise about the center of the triangle
     * Please note that this is an in place operation
     * @param m integer a measure a Primary triangle of order (m, n) m > n
     * @param n >= 0 integer a measure for a Primary triangle of order (m, n)
     * @returns the rotated IsoVector
     */
    rotateNeg120(m: number, n: number): this;
    /**
     * Transforms an IsoVector to one in Cartesian 3D space based on an isovector
     * @param origin an IsoVector
     * @param isoGridSize
     * @returns Point as a Vector3
     */
    toCartesianOrigin(origin: _IsoVector, isoGridSize: number): Vector3;
    /**
     * Gets a new IsoVector(0, 0)
     * @returns a new IsoVector
     */
    static Zero(): _IsoVector;
}
