import type { ShaderLanguage } from "../../Materials/shaderLanguage";
import type { ShaderProcessingContext } from "../Processors/shaderProcessingOptions";
/** @internal */
export interface WebGPUBindingInfo {
    groupIndex: number;
    bindingIndex: number;
}
/** @internal */
export interface WebGPUTextureDescription {
    autoBindSampler?: boolean;
    isTextureArray: boolean;
    isStorageTexture: boolean;
    textures: Array<WebGPUBindingInfo>;
    sampleType?: GPUTextureSampleType;
}
/** @internal */
export interface WebGPUSamplerDescription {
    binding: WebGPUBindingInfo;
    type: GPUSamplerBindingType;
}
/** @internal */
export interface WebGPUBufferDescription {
    binding: WebGPUBindingInfo;
}
/** @internal */
export interface WebGPUBindGroupLayoutEntryInfo {
    name: string;
    index: number;
    nameInArrayOfTexture?: string;
}
/**
 * @internal
 */
export declare class WebGPUShaderProcessingContext implements ShaderProcessingContext {
    /** @internal */
    static _SimplifiedKnownBindings: boolean;
    protected static _SimplifiedKnownUBOs: {
        [key: string]: WebGPUBufferDescription;
    };
    protected static _KnownUBOs: {
        [key: string]: WebGPUBufferDescription;
    };
    static get KnownUBOs(): {
        [key: string]: WebGPUBufferDescription;
    };
    shaderLanguage: ShaderLanguage;
    uboNextBindingIndex: number;
    freeGroupIndex: number;
    freeBindingIndex: number;
    availableVaryings: {
        [key: string]: number;
    };
    availableAttributes: {
        [key: string]: number;
    };
    availableBuffers: {
        [key: string]: WebGPUBufferDescription;
    };
    availableTextures: {
        [key: string]: WebGPUTextureDescription;
    };
    availableSamplers: {
        [key: string]: WebGPUSamplerDescription;
    };
    leftOverUniforms: {
        name: string;
        type: string;
        length: number;
    }[];
    orderedAttributes: string[];
    bindGroupLayoutEntries: GPUBindGroupLayoutEntry[][];
    bindGroupLayoutEntryInfo: WebGPUBindGroupLayoutEntryInfo[][];
    bindGroupEntries: GPUBindGroupEntry[][];
    bufferNames: string[];
    textureNames: string[];
    samplerNames: string[];
    attributeNamesFromEffect: string[];
    attributeLocationsFromEffect: number[];
    private _attributeNextLocation;
    private _varyingNextLocation;
    constructor(shaderLanguage: ShaderLanguage);
    private _findStartingGroupBinding;
    getAttributeNextLocation(dataType: string, arrayLength?: number): number;
    getVaryingNextLocation(dataType: string, arrayLength?: number): number;
    getNextFreeUBOBinding(): {
        groupIndex: number;
        bindingIndex: number;
    };
    private _getNextFreeBinding;
}
