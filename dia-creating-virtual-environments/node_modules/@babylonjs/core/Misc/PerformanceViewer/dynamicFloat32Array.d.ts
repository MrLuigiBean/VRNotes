/**
 * A class acting as a dynamic float32array used in the performance viewer
 */
export declare class DynamicFloat32Array {
    private _view;
    private _itemLength;
    /**
     * Creates a new DynamicFloat32Array with the desired item capacity.
     * @param itemCapacity The initial item capacity you would like to set for the array.
     */
    constructor(itemCapacity: number);
    /**
     * The number of items currently in the array.
     */
    get itemLength(): number;
    /**
     * Gets value at index, NaN if no such index exists.
     * @param index the index to get the value at.
     * @returns the value at the index provided.
     */
    at(index: number): number;
    /**
     * Gets a view of the original array from start to end (exclusive of end).
     * @param start starting index.
     * @param end ending index.
     * @returns a subarray of the original array.
     */
    subarray(start: number, end: number): Float32Array;
    /**
     * Pushes items to the end of the array.
     * @param item The item to push into the array.
     */
    push(item: number): void;
    /**
     * Grows the array by the growth factor when necessary.
     */
    private _growArray;
}
