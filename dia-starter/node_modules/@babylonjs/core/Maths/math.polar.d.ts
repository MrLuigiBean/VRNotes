import type { DeepImmutable } from "../types";
import { Vector2, Vector3 } from "./math.vector";
/**
 * Class used to store (r, theta) vector representation
 */
export declare class Polar {
    radius: number;
    theta: number;
    /**
     * Creates a new Polar object
     * @param radius the radius of the vector
     * @param theta the angle of the vector
     */
    constructor(radius: number, theta: number);
    /**
     * Gets the class name
     * @returns the string "Polar"
     */
    getClassName(): string;
    /**
     * Converts the current polar to a string
     * @returns the current polar as a string
     */
    toString(): string;
    /**
     * Converts the current polar to an array
     * @reutrns the current polar as an array
     */
    asArray(): number[];
    /**
     * Adds the current Polar and the given Polar and stores the result
     * @param polar the polar to add
     * @param ref the polar to store the result in
     * @returns the updated ref
     */
    addToRef(polar: Polar, ref: Polar): Polar;
    /**
     * Adds the current Polar and the given Polar
     * @param polar the polar to add
     * @returns the sum polar
     */
    add(polar: Polar): Polar;
    /**
     * Adds the given polar to the current polar
     * @param polar the polar to add
     * @returns the current polar
     */
    addInPlace(polar: Polar): this;
    /**
     * Adds the provided values to the current polar
     * @param radius the amount to add to the radius
     * @param theta the amount to add to the theta
     * @returns the current polar
     */
    addInPlaceFromFloats(radius: number, theta: number): this;
    /**
     * Subtracts the given Polar from the current Polar and stores the result
     * @param polar the polar to subtract
     * @param ref the polar to store the result in
     * @returns the updated ref
     */
    subtractToRef(polar: Polar, ref: Polar): Polar;
    /**
     * Subtracts the given Polar from the current Polar
     * @param polar the polar to subtract
     * @returns the difference polar
     */
    subtract(polar: Polar): Polar;
    /**
     * Subtracts the given Polar from the current Polar
     * @param polar the polar to subtract
     * @returns the current polar
     */
    subtractInPlace(polar: Polar): this;
    /**
     * Subtracts the given floats from the current polar
     * @param radius the amount to subtract from the radius
     * @param theta the amount to subtract from the theta
     * @param ref the polar to store the result in
     * @returns the updated ref
     */
    subtractFromFloatsToRef(radius: number, theta: number, ref: Polar): Polar;
    /**
     * Subtracts the given floats from the current polar
     * @param radius the amount to subtract from the radius
     * @param theta the amount to subtract from the theta
     * @returns the difference polar
     */
    subtractFromFloats(radius: number, theta: number): Polar;
    /**
     * Multiplies the given Polar with the current Polar and stores the result
     * @param polar the polar to multiply
     * @param ref the polar to store the result in
     * @returns the updated ref
     */
    multiplyToRef(polar: Polar, ref: Polar): Polar;
    /**
     * Multiplies the given Polar with the current Polar
     * @param polar the polar to multiply
     * @returns the product polar
     */
    multiply(polar: Polar): Polar;
    /**
     * Multiplies the given Polar with the current Polar
     * @param polar the polar to multiply
     * @returns the current polar
     */
    multiplyInPlace(polar: Polar): this;
    /**
     * Divides the current Polar by the given Polar and stores the result
     * @param polar the polar to divide
     * @param ref the polar to store the result in
     * @returns the updated ref
     */
    divideToRef(polar: Polar, ref: Polar): Polar;
    /**
     * Divides the current Polar by the given Polar
     * @param polar the polar to divide
     * @returns the quotient polar
     */
    divide(polar: Polar): Polar;
    /**
     * Divides the current Polar by the given Polar
     * @param polar the polar to divide
     * @returns the current polar
     */
    divideInPlace(polar: Polar): this;
    /**
     * Clones the current polar
     * @returns a clone of the current polar
     */
    clone(): Polar;
    /**
     * Copies the source polar into the current polar
     * @param source the polar to copy from
     * @returns the current polar
     */
    copyFrom(source: Polar): this;
    /**
     * Copies the given values into the current polar
     * @param radius the radius to use
     * @param theta the theta to use
     * @returns the current polar
     */
    copyFromFloats(radius: number, theta: number): this;
    /**
     * Scales the current polar and stores the result
     * @param scale defines the multiplication factor
     * @param ref where to store the result
     * @returns the updated ref
     */
    scaleToRef(scale: number, ref: Polar): Polar;
    /**
     * Scales the current polar and returns a new polar with the scaled coordinates
     * @param scale defines the multiplication factor
     * @returns the scaled polar
     */
    scale(scale: number): Polar;
    /**
     * Scales the current polar
     * @param scale defines the multiplication factor
     * @returns the current polar
     */
    scaleInPlace(scale: number): this;
    /**
     * Sets the values of the current polar
     * @param radius the new radius
     * @param theta the new theta
     * @returns the current polar
     */
    set(radius: number, theta: number): this;
    /**
     * Sets the values of the current polar
     * @param value the new values
     * @returns the current polar
     */
    setAll(value: number): this;
    /**
     * Gets the rectangular coordinates of the current Polar
     * @param ref the reference to assign the result
     * @returns the updated reference
     */
    toVector2ToRef(ref: Vector2): Vector2;
    /**
     * Gets the rectangular coordinates of the current Polar
     * @returns the rectangular coordinates
     */
    toVector2(): Vector2;
    /**
     * Converts a given Vector2 to its polar coordinates
     * @param v the Vector2 to convert
     * @param ref the reference to assign the result
     * @returns the updated reference
     */
    static FromVector2ToRef(v: Vector2, ref: Polar): Polar;
    /**
     * Converts a given Vector2 to its polar coordinates
     * @param v the Vector2 to convert
     * @returns a Polar
     */
    static FromVector2(v: Vector2): Polar;
    /**
     * Converts an array of floats to a polar
     * @param array the array to convert
     * @returns the converted polar
     */
    static FromArray(array: number[]): Polar;
}
/**
 * Class used for (radius, theta, phi) vector representation.
 */
export declare class Spherical {
    radius: number;
    theta: number;
    phi: number;
    /**
     * @param radius spherical radius
     * @param theta angle from positive y axis to radial line from 0 to PI (vertical)
     * @param phi angle from positive x axis measured anticlockwise from -PI to PI (horizontal)
     */
    constructor(radius: number, theta: number, phi: number);
    /**
     * Gets the class name
     * @returns the string "Spherical"
     */
    getClassName(): string;
    /**
     * Converts the current spherical to a string
     * @returns the current spherical as a string
     */
    toString(): string;
    /**
     * Converts the current spherical to an array
     * @reutrns the current spherical as an array
     */
    asArray(): number[];
    /**
     * Adds the current Spherical and the given Spherical and stores the result
     * @param spherical the spherical to add
     * @param ref the spherical to store the result in
     * @returns the updated ref
     */
    addToRef(spherical: Spherical, ref: Spherical): Spherical;
    /**
     * Adds the current Spherical and the given Spherical
     * @param spherical the spherical to add
     * @returns the sum spherical
     */
    add(spherical: Spherical): Spherical;
    /**
     * Adds the given spherical to the current spherical
     * @param spherical the spherical to add
     * @returns the current spherical
     */
    addInPlace(spherical: Spherical): this;
    /**
     * Adds the provided values to the current spherical
     * @param radius the amount to add to the radius
     * @param theta the amount to add to the theta
     * @param phi the amount to add to the phi
     * @returns the current spherical
     */
    addInPlaceFromFloats(radius: number, theta: number, phi: number): this;
    /**
     * Subtracts the given Spherical from the current Spherical and stores the result
     * @param spherical the spherical to subtract
     * @param ref the spherical to store the result in
     * @returns the updated ref
     */
    subtractToRef(spherical: Spherical, ref: Spherical): Spherical;
    /**
     * Subtracts the given Spherical from the current Spherical
     * @param spherical the spherical to subtract
     * @returns the difference spherical
     */
    subtract(spherical: Spherical): Spherical;
    /**
     * Subtracts the given Spherical from the current Spherical
     * @param spherical the spherical to subtract
     * @returns the current spherical
     */
    subtractInPlace(spherical: Spherical): this;
    /**
     * Subtracts the given floats from the current spherical
     * @param radius the amount to subtract from the radius
     * @param theta the amount to subtract from the theta
     * @param phi the amount to subtract from the phi
     * @param ref the spherical to store the result in
     * @returns the updated ref
     */
    subtractFromFloatsToRef(radius: number, theta: number, phi: number, ref: Spherical): Spherical;
    /**
     * Subtracts the given floats from the current spherical
     * @param radius the amount to subtract from the radius
     * @param theta the amount to subtract from the theta
     * @param phi the amount to subtract from the phi
     * @returns the difference spherical
     */
    subtractFromFloats(radius: number, theta: number, phi: number): Spherical;
    /**
     * Multiplies the given Spherical with the current Spherical and stores the result
     * @param spherical the spherical to multiply
     * @param ref the spherical to store the result in
     * @returns the updated ref
     */
    multiplyToRef(spherical: Spherical, ref: Spherical): Spherical;
    /**
     * Multiplies the given Spherical with the current Spherical
     * @param spherical the spherical to multiply
     * @returns the product spherical
     */
    multiply(spherical: Spherical): Spherical;
    /**
     * Multiplies the given Spherical with the current Spherical
     * @param spherical the spherical to multiply
     * @returns the current spherical
     */
    multiplyInPlace(spherical: Spherical): this;
    /**
     * Divides the current Spherical by the given Spherical and stores the result
     * @param spherical the spherical to divide
     * @param ref the spherical to store the result in
     * @returns the updated ref
     */
    divideToRef(spherical: Spherical, ref: Spherical): Spherical;
    /**
     * Divides the current Spherical by the given Spherical
     * @param spherical the spherical to divide
     * @returns the quotient spherical
     */
    divide(spherical: Spherical): Spherical;
    /**
     * Divides the current Spherical by the given Spherical
     * @param spherical the spherical to divide
     * @returns the current spherical
     */
    divideInPlace(spherical: Spherical): this;
    /**
     * Clones the current spherical
     * @returns a clone of the current spherical
     */
    clone(): Spherical;
    /**
     * Copies the source spherical into the current spherical
     * @param source the spherical to copy from
     * @returns the current spherical
     */
    copyFrom(source: Spherical): this;
    /**
     * Copies the given values into the current spherical
     * @param radius the radius to use
     * @param theta the theta to use
     * @param phi the phi to use
     * @returns the current spherical
     */
    copyFromFloats(radius: number, theta: number, phi: number): this;
    /**
     * Scales the current spherical and stores the result
     * @param scale defines the multiplication factor
     * @param ref where to store the result
     * @returns the updated ref
     */
    scaleToRef(scale: number, ref: Spherical): Spherical;
    /**
     * Scales the current spherical and returns a new spherical with the scaled coordinates
     * @param scale defines the multiplication factor
     * @returns the scaled spherical
     */
    scale(scale: number): Spherical;
    /**
     * Scales the current spherical
     * @param scale defines the multiplication factor
     * @returns the current spherical
     */
    scaleInPlace(scale: number): this;
    /**
     * Sets the values of the current spherical
     * @param radius the new radius
     * @param theta the new theta
     * @param phi the new phi
     * @returns the current spherical
     */
    set(radius: number, theta: number, phi: number): this;
    /**
     * Sets the values of the current spherical
     * @param value the new values
     * @returns the current spherical
     */
    setAll(value: number): this;
    /**
     * Assigns the rectangular coordinates of the current Spherical to a Vector3
     * @param ref the Vector3 to update
     * @returns the updated Vector3
     */
    toVector3ToRef(ref: DeepImmutable<Vector3>): Vector3;
    /**
     * Gets a Vector3 from the current spherical coordinates
     * @returns the (x, y,z) form of the current Spherical
     */
    toVector3(): Vector3;
    /**
     * Assigns the spherical coordinates from a Vector3
     * @param vector the vector to convert
     * @param ref the Spherical to update
     * @returns the updated ref
     */
    static FromVector3ToRef(vector: DeepImmutable<Vector3>, ref: Spherical): Spherical;
    /**
     * Gets a Spherical from a Vector3
     * @param vector defines the vector in (x, y, z) coordinate space
     * @returns a new Spherical
     */
    static FromVector3(vector: DeepImmutable<Vector3>): Spherical;
    /**
     * Converts an array of floats to a spherical
     * @param array the array to convert
     * @returns the converted spherical
     */
    static FromArray(array: number[]): Spherical;
}
