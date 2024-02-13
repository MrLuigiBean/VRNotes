import type { NativeData } from "./nativeDataStream";
import { NativeDataStream } from "./nativeDataStream";
/**
 * Validated Native Data Stream
 */
export declare class ValidatedNativeDataStream extends NativeDataStream {
    constructor();
    writeUint32(value: number): void;
    writeInt32(value: number): void;
    writeFloat32(value: number): void;
    writeUint32Array(values: Uint32Array): void;
    writeInt32Array(values: Int32Array): void;
    writeFloat32Array(values: Float32Array): void;
    writeNativeData(handle: NativeData): void;
    writeBoolean(value: boolean): void;
}
