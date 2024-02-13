/** @internal */
interface TupleTypes<T> {
    2: [T, T];
    3: [T, T, T];
    4: [T, T, T, T];
    5: [T, T, T, T, T];
    6: [T, T, T, T, T, T];
    7: [T, T, T, T, T, T, T];
    8: [T, T, T, T, T, T, T, T];
    9: [T, T, T, T, T, T, T, T, T];
    10: [T, T, T, T, T, T, T, T, T, T];
    11: [T, T, T, T, T, T, T, T, T, T, T];
    12: [T, T, T, T, T, T, T, T, T, T, T, T];
    13: [T, T, T, T, T, T, T, T, T, T, T, T, T];
    14: [T, T, T, T, T, T, T, T, T, T, T, T, T, T];
    15: [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T];
}
/**
 * Class containing a set of static utilities functions for arrays.
 */
export declare class ArrayTools {
    /**
     * Returns an array of the given size filled with elements built from the given constructor and the parameters.
     * @param size the number of element to construct and put in the array.
     * @param itemBuilder a callback responsible for creating new instance of item. Called once per array entry.
     * @returns a new array filled with new objects.
     */
    static BuildArray<T>(size: number, itemBuilder: () => T): Array<T>;
    /**
     * Returns a tuple of the given size filled with elements built from the given constructor and the parameters.
     * @param size he number of element to construct and put in the tuple.
     * @param itemBuilder a callback responsible for creating new instance of item. Called once per tuple entry.
     * @returns a new tuple filled with new objects.
     */
    static BuildTuple<T, N extends keyof TupleTypes<unknown>>(size: N, itemBuilder: () => T): TupleTypes<T>[N];
}
/**
 * Defines the callback type used when an observed array function is triggered.
 * @internal
 */
export type _ObserveCallback = (functionName: string, previousLength: number) => void;
/**
 * Observes an array and notifies the given observer when the array is modified.
 * @param array Defines the array to observe
 * @param callback Defines the function to call when the array is modified (in the limit of the observed array functions)
 * @returns A function to call to stop observing the array
 * @internal
 */
export declare function _ObserveArray<T>(array: T[], callback: _ObserveCallback): () => void;
export {};
