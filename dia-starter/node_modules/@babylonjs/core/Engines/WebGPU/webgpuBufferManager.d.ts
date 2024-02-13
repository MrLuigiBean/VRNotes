import type { DataBuffer } from "../../Buffers/dataBuffer";
import { WebGPUDataBuffer } from "../../Meshes/WebGPU/webgpuDataBuffer";
import type { Nullable } from "../../types";
import type { WebGPUEngine } from "../webgpuEngine";
/** @internal */
export declare class WebGPUBufferManager {
    private _engine;
    private _device;
    private _deferredReleaseBuffers;
    private static _IsGPUBuffer;
    private static _FlagsToString;
    constructor(engine: WebGPUEngine, device: GPUDevice);
    createRawBuffer(viewOrSize: ArrayBufferView | number, flags: GPUBufferUsageFlags, mappedAtCreation?: boolean, label?: string): GPUBuffer;
    createBuffer(viewOrSize: ArrayBufferView | number, flags: GPUBufferUsageFlags, label?: string): WebGPUDataBuffer;
    setRawData(buffer: GPUBuffer, dstByteOffset: number, src: ArrayBufferView, srcByteOffset: number, byteLength: number): void;
    setSubData(dataBuffer: WebGPUDataBuffer, dstByteOffset: number, src: ArrayBufferView, srcByteOffset?: number, byteLength?: number): void;
    private _getHalfFloatAsFloatRGBAArrayBuffer;
    readDataFromBuffer(gpuBuffer: GPUBuffer, size: number, width: number, height: number, bytesPerRow: number, bytesPerRowAligned: number, type?: number, offset?: number, buffer?: Nullable<ArrayBufferView>, destroyBuffer?: boolean, noDataConversion?: boolean): Promise<ArrayBufferView>;
    releaseBuffer(buffer: DataBuffer | GPUBuffer): boolean;
    destroyDeferredBuffers(): void;
}
