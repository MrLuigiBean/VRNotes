import type { IComputeContext } from "../../Compute/IComputeContext";
import type { ComputeBindingList, ComputeBindingMapping } from "../Extensions/engine.computeShader";
import type { WebGPUCacheSampler } from "./webgpuCacheSampler";
/** @internal */
export declare class WebGPUComputeContext implements IComputeContext {
    private static _Counter;
    readonly uniqueId: number;
    private _device;
    private _cacheSampler;
    private _bindGroups;
    private _bindGroupEntries;
    getBindGroups(bindings: ComputeBindingList, computePipeline: GPUComputePipeline, bindingsMapping?: ComputeBindingMapping): GPUBindGroup[];
    constructor(device: GPUDevice, cacheSampler: WebGPUCacheSampler);
    clear(): void;
}
