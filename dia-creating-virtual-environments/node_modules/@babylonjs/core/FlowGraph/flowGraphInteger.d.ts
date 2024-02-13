/**
 * @experimental
 * Class that represents an integer value.
 */
export declare class FlowGraphInteger {
    /**
     * The value of the integer. Its type
     * is a javascript number. Shouldn't be
     * directly modified - it is populated by
     * the constructor.
     */
    readonly value: number;
    constructor(value: number);
    /**
     * Converts a float to an integer.
     * @param n the float to convert
     * @returns the result of n | 0 - converting it to a int
     */
    private _toInt;
    /**
     * Adds two integers together.
     * @param other the other integer to add
     * @returns a FlowGraphInteger with the result of the addition
     */
    add(other: FlowGraphInteger): FlowGraphInteger;
    /**
     * Subtracts two integers.
     * @param other the other integer to subtract
     * @returns a FlowGraphInteger with the result of the subtraction
     */
    subtract(other: FlowGraphInteger): FlowGraphInteger;
    /**
     * Multiplies two integers.
     * @param other the other integer to multiply
     * @returns a FlowGraphInteger with the result of the multiplication
     */
    multiply(other: FlowGraphInteger): FlowGraphInteger;
    /**
     * Divides two integers.
     * @param other the other integer to divide
     * @returns a FlowGraphInteger with the result of the division
     */
    divide(other: FlowGraphInteger): FlowGraphInteger;
    /**
     * The class name of this type.
     * @returns
     */
    getClassName(): string;
    /**
     * Compares two integers for equality.
     * @param other the other integer to compare
     * @returns
     */
    equals(other: FlowGraphInteger): boolean;
    static ClassName: string;
    /**
     * Parses a FlowGraphInteger from a serialization object.
     * @param serializationObject
     * @returns
     */
    static Parse(serializationObject: any): FlowGraphInteger;
}
