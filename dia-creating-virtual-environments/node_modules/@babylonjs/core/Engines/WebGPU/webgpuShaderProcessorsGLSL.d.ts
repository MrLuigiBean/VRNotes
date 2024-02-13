import type { Nullable } from "../../types";
import type { ShaderProcessingContext } from "../Processors/shaderProcessingOptions";
import type { WebGPUBufferDescription } from "./webgpuShaderProcessingContext";
import type { ThinEngine } from "../thinEngine";
import { WebGPUShaderProcessor } from "./webgpuShaderProcessor";
import { ShaderLanguage } from "../../Materials/shaderLanguage";
/** @internal */
export declare class WebGPUShaderProcessorGLSL extends WebGPUShaderProcessor {
    protected _missingVaryings: Array<string>;
    protected _textureArrayProcessing: Array<string>;
    protected _preProcessors: {
        [key: string]: string;
    };
    protected _vertexIsGLES3: boolean;
    protected _fragmentIsGLES3: boolean;
    shaderLanguage: ShaderLanguage;
    parseGLES3: boolean;
    attributeKeywordName: string | undefined;
    varyingVertexKeywordName: string | undefined;
    varyingFragmentKeywordName: string | undefined;
    protected _getArraySize(name: string, type: string, preProcessors: {
        [key: string]: string;
    }): [string, string, number];
    initializeShaders(processingContext: Nullable<ShaderProcessingContext>): void;
    preProcessShaderCode(code: string, isFragment: boolean): string;
    varyingCheck(varying: string, isFragment: boolean): boolean;
    varyingProcessor(varying: string, isFragment: boolean, preProcessors: {
        [key: string]: string;
    }): string;
    attributeProcessor(attribute: string, preProcessors: {
        [key: string]: string;
    }): string;
    uniformProcessor(uniform: string, isFragment: boolean, preProcessors: {
        [key: string]: string;
    }): string;
    uniformBufferProcessor(uniformBuffer: string, isFragment: boolean): string;
    postProcessor(code: string, defines: string[], isFragment: boolean, processingContext: Nullable<ShaderProcessingContext>, engine: ThinEngine): string;
    private _applyTextureArrayProcessing;
    protected _generateLeftOverUBOCode(name: string, uniformBufferDescription: WebGPUBufferDescription): string;
    finalizeShaders(vertexCode: string, fragmentCode: string): {
        vertexCode: string;
        fragmentCode: string;
    };
}
