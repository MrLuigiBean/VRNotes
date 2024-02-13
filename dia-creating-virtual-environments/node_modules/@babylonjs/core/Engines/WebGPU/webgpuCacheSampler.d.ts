import type { TextureSampler } from "../../Materials/Textures/textureSampler";
import type { Nullable } from "../../types";
/** @internal */
export declare class WebGPUCacheSampler {
    private _samplers;
    private _device;
    disabled: boolean;
    constructor(device: GPUDevice);
    static GetSamplerHashCode(sampler: TextureSampler): number;
    private static _GetSamplerFilterDescriptor;
    private static _GetWrappingMode;
    private static _GetSamplerWrappingDescriptor;
    private static _GetSamplerDescriptor;
    static GetCompareFunction(compareFunction: Nullable<number>): GPUCompareFunction;
    getSampler(sampler: TextureSampler, bypassCache?: boolean, hash?: number, label?: string): GPUSampler;
}
