import type { WebGPUBufferManager } from "./webgpuBufferManager";
import { PerfCounter } from "../../Misc/perfCounter";
import type { WebGPUEngine } from "../webgpuEngine";
import type { WebGPUPerfCounter } from "./webgpuPerfCounter";
/** @internal */
export declare class WebGPUTimestampQuery {
    private _engine;
    private _device;
    private _bufferManager;
    private _enabled;
    private _gpuFrameTimeCounter;
    private _measureDuration;
    private _measureDurationState;
    get gpuFrameTimeCounter(): PerfCounter;
    constructor(engine: WebGPUEngine, device: GPUDevice, bufferManager: WebGPUBufferManager);
    get enable(): boolean;
    set enable(value: boolean);
    startFrame(commandEncoder: GPUCommandEncoder): void;
    endFrame(commandEncoder: GPUCommandEncoder): void;
    startPass(descriptor: GPURenderPassDescriptor | GPUComputePassDescriptor, index: number): void;
    endPass(index: number, gpuPerfCounter?: WebGPUPerfCounter): void;
    dispose(): void;
}
/** @internal */
export declare class WebGPUDurationMeasure {
    private _querySet;
    private _count;
    constructor(engine: WebGPUEngine, device: GPUDevice, bufferManager: WebGPUBufferManager, count?: number, querySetLabel?: string);
    start(encoder: GPUCommandEncoder): void;
    stop(encoder: GPUCommandEncoder): Promise<number | null>;
    startPass(descriptor: GPURenderPassDescriptor | GPUComputePassDescriptor, index: number): void;
    stopPass(index: number): Promise<number | null>;
    dispose(): void;
}
