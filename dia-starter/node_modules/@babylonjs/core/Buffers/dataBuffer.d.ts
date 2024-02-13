/**
 * Class used to store gfx data (like WebGLBuffer)
 */
export declare class DataBuffer {
    private static _Counter;
    /**
     * Gets or sets the number of objects referencing this buffer
     */
    references: number;
    /** Gets or sets the size of the underlying buffer */
    capacity: number;
    /**
     * Gets or sets a boolean indicating if the buffer contains 32bits indices
     */
    is32Bits: boolean;
    /**
     * Gets the underlying buffer
     */
    get underlyingResource(): any;
    /**
     * Gets the unique id of this buffer
     */
    readonly uniqueId: number;
    /**
     * Constructs the buffer
     */
    constructor();
}
