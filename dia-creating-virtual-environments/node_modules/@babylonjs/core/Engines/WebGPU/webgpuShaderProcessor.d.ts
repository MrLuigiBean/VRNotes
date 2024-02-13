import { ShaderLanguage } from "../../Materials/shaderLanguage";
import type { Nullable } from "../../types";
import type { IShaderProcessor } from "../Processors/iShaderProcessor";
import type { WebGPUSamplerDescription, WebGPUShaderProcessingContext, WebGPUTextureDescription, WebGPUBufferDescription } from "./webgpuShaderProcessingContext";
/** @internal */
export declare abstract class WebGPUShaderProcessor implements IShaderProcessor {
    static readonly AutoSamplerSuffix = "Sampler";
    static readonly LeftOvertUBOName = "LeftOver";
    static readonly InternalsUBOName = "Internals";
    static UniformSizes: {
        [type: string]: number;
    };
    protected static _SamplerFunctionByWebGLSamplerType: {
        [key: string]: string;
    };
    protected static _TextureTypeByWebGLSamplerType: {
        [key: string]: string;
    };
    protected static _GpuTextureViewDimensionByWebGPUTextureType: {
        [key: string]: GPUTextureViewDimension;
    };
    protected static _SamplerTypeByWebGLSamplerType: {
        [key: string]: string;
    };
    protected static _IsComparisonSamplerByWebGPUSamplerType: {
        [key: string]: boolean;
    };
    shaderLanguage: ShaderLanguage;
    vertexBufferKindToNumberOfComponents: {
        [kind: string]: number;
    };
    protected _webgpuProcessingContext: WebGPUShaderProcessingContext;
    protected abstract _getArraySize(name: string, type: string, preProcessors: {
        [key: string]: string;
    }): [string, string, number];
    protected abstract _generateLeftOverUBOCode(name: string, uniformBufferDescription: WebGPUBufferDescription): string;
    protected _addUniformToLeftOverUBO(name: string, uniformType: string, preProcessors: {
        [key: string]: string;
    }): void;
    protected _buildLeftOverUBO(): string;
    protected _collectBindingNames(): void;
    protected _preCreateBindGroupEntries(): void;
    protected _addTextureBindingDescription(name: string, textureInfo: WebGPUTextureDescription, textureIndex: number, dimension: Nullable<GPUTextureViewDimension>, format: Nullable<GPUTextureFormat>, isVertex: boolean): void;
    protected _addSamplerBindingDescription(name: string, samplerInfo: WebGPUSamplerDescription, isVertex: boolean): void;
    protected _addBufferBindingDescription(name: string, uniformBufferInfo: WebGPUBufferDescription, bufferType: GPUBufferBindingType, isVertex: boolean): void;
    protected _injectStartingAndEndingCode(code: string, mainFuncDecl: string, startingCode?: string, endingCode?: string): string;
}
