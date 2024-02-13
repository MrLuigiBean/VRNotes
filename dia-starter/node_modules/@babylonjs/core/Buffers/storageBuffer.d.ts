import type { ThinEngine } from "../Engines/thinEngine";
import type { DataBuffer } from "../Buffers/dataBuffer";
import type { DataArray } from "../types";
/**
 * This class is a small wrapper around a native buffer that can be read and/or written
 */
export declare class StorageBuffer {
    private _engine;
    private _buffer;
    private _bufferSize;
    private _creationFlags;
    private _label?;
    /**
     * Creates a new storage buffer instance
     * @param engine The engine the buffer will be created inside
     * @param size The size of the buffer in bytes
     * @param creationFlags flags to use when creating the buffer (see Constants.BUFFER_CREATIONFLAG_XXX). The BUFFER_CREATIONFLAG_STORAGE flag will be automatically added.
     * @param label defines the label of the buffer (for debug purpose)
     */
    constructor(engine: ThinEngine, size: number, creationFlags?: number, label?: string);
    private _create;
    /** @internal */
    _rebuild(): void;
    /**
     * Gets underlying native buffer
     * @returns underlying native buffer
     */
    getBuffer(): DataBuffer;
    /**
     * Updates the storage buffer
     * @param data the data used to update the storage buffer
     * @param byteOffset the byte offset of the data (optional)
     * @param byteLength the byte length of the data (optional)
     */
    update(data: DataArray, byteOffset?: number, byteLength?: number): void;
    /**
     * Reads data from the storage buffer
     * @param offset The offset in the storage buffer to start reading from (default: 0)
     * @param size  The number of bytes to read from the storage buffer (default: capacity of the buffer)
     * @param buffer The buffer to write the data we have read from the storage buffer to (optional)
     * @param noDelay If true, a call to flushFramebuffer will be issued so that the data can be read back immediately. This can speed up data retrieval, at the cost of a small perf penalty (default: false).
     * @returns If not undefined, returns the (promise) buffer (as provided by the 4th parameter) filled with the data, else it returns a (promise) Uint8Array with the data read from the storage buffer
     */
    read(offset?: number, size?: number, buffer?: ArrayBufferView, noDelay?: boolean): Promise<ArrayBufferView>;
    /**
     * Disposes the storage buffer
     */
    dispose(): void;
}
