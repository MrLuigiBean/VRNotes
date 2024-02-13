/** @internal */
export type NativeData = Uint32Array;
/** @internal */
export declare class NativeDataStream {
    private readonly _uint32s;
    private readonly _int32s;
    private readonly _float32s;
    private readonly _length;
    private _position;
    private readonly _nativeDataStream;
    private static readonly DEFAULT_BUFFER_SIZE;
    constructor();
    writeUint32(value: number): void;
    writeInt32(value: number): void;
    writeFloat32(value: number): void;
    writeUint32Array(values: Uint32Array): void;
    writeInt32Array(values: Int32Array): void;
    writeFloat32Array(values: Float32Array): void;
    writeNativeData(handle: NativeData): void;
    writeBoolean(value: boolean): void;
    private _flushIfNecessary;
    private _flush;
}
