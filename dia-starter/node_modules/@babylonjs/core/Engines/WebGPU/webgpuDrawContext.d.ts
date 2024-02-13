import type { WebGPUDataBuffer } from "../../Meshes/WebGPU/webgpuDataBuffer";
import type { Nullable } from "../../types";
import type { IDrawContext } from "../IDrawContext";
import type { WebGPUBufferManager } from "./webgpuBufferManager";
/** @internal */
export declare class WebGPUDrawContext implements IDrawContext {
    private static _Counter;
    fastBundle?: GPURenderBundle;
    bindGroups?: GPUBindGroup[];
    uniqueId: number;
    buffers: {
        [name: string]: Nullable<WebGPUDataBuffer>;
    };
    indirectDrawBuffer?: GPUBuffer;
    private _materialContextUpdateId;
    private _bufferManager;
    private _useInstancing;
    private _indirectDrawData?;
    private _currentInstanceCount;
    private _isDirty;
    isDirty(materialContextUpdateId: number): boolean;
    resetIsDirty(materialContextUpdateId: number): void;
    get useInstancing(): boolean;
    set useInstancing(use: boolean);
    constructor(bufferManager: WebGPUBufferManager);
    reset(): void;
    setBuffer(name: string, buffer: Nullable<WebGPUDataBuffer>): void;
    setIndirectData(indexOrVertexCount: number, instanceCount: number, firstIndexOrVertex: number): void;
    dispose(): void;
}
