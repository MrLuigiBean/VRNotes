import type { WebGPUEngine } from "../webgpuEngine";
import type { WebGPUBufferManager } from "./webgpuBufferManager";
import type { QueryType } from "./webgpuConstants";
/** @internal */
export declare class WebGPUQuerySet {
    private _engine;
    private _device;
    private _bufferManager;
    private _count;
    private _canUseMultipleBuffers;
    private _querySet;
    private _queryBuffer;
    private _dstBuffers;
    get querySet(): GPUQuerySet;
    constructor(engine: WebGPUEngine, count: number, type: QueryType, device: GPUDevice, bufferManager: WebGPUBufferManager, canUseMultipleBuffers?: boolean, label?: string);
    private _getBuffer;
    readValues(firstQuery?: number, queryCount?: number): Promise<BigUint64Array | null>;
    readValue(firstQuery?: number): Promise<number | null>;
    readTwoValuesAndSubtract(firstQuery?: number): Promise<number | null>;
    dispose(): void;
}
