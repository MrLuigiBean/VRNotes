import type { IComputePipelineContext } from "../../Compute/IComputePipelineContext";
import type { Nullable } from "../../types";
import type { WebGPUEngine } from "../webgpuEngine";
/** @internal */
export declare class WebGPUComputePipelineContext implements IComputePipelineContext {
    engine: WebGPUEngine;
    sources: {
        compute: string;
        rawCompute: string;
    };
    stage: Nullable<GPUProgrammableStage>;
    computePipeline: GPUComputePipeline;
    get isAsync(): boolean;
    get isReady(): boolean;
    /** @internal */
    _name: string;
    constructor(engine: WebGPUEngine);
    _getComputeShaderCode(): string | null;
    dispose(): void;
}
