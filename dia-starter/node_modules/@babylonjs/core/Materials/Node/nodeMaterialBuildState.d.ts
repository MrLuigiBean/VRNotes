import { NodeMaterialBlockConnectionPointTypes } from "./Enums/nodeMaterialBlockConnectionPointTypes";
import { NodeMaterialBlockTargets } from "./Enums/nodeMaterialBlockTargets";
import type { NodeMaterialBuildStateSharedData } from "./nodeMaterialBuildStateSharedData";
/**
 * Class used to store node based material build state
 */
export declare class NodeMaterialBuildState {
    /** Gets or sets a boolean indicating if the current state can emit uniform buffers */
    supportUniformBuffers: boolean;
    /**
     * Gets the list of emitted attributes
     */
    attributes: string[];
    /**
     * Gets the list of emitted uniforms
     */
    uniforms: string[];
    /**
     * Gets the list of emitted constants
     */
    constants: string[];
    /**
     * Gets the list of emitted samplers
     */
    samplers: string[];
    /**
     * Gets the list of emitted functions
     */
    functions: {
        [key: string]: string;
    };
    /**
     * Gets the list of emitted extensions
     */
    extensions: {
        [key: string]: string;
    };
    /**
     * Gets the list of emitted prePass outputs - if using the prepass
     */
    prePassOutput: {
        [key: string]: string;
    };
    /**
     * Gets the target of the compilation state
     */
    target: NodeMaterialBlockTargets;
    /**
     * Gets the list of emitted counters
     */
    counters: {
        [key: string]: number;
    };
    /**
     * Shared data between multiple NodeMaterialBuildState instances
     */
    sharedData: NodeMaterialBuildStateSharedData;
    /** @internal */
    _vertexState: NodeMaterialBuildState;
    /** @internal */
    _attributeDeclaration: string;
    /** @internal */
    _uniformDeclaration: string;
    /** @internal */
    _constantDeclaration: string;
    /** @internal */
    _samplerDeclaration: string;
    /** @internal */
    _varyingTransfer: string;
    /** @internal */
    _injectAtEnd: string;
    private _repeatableContentAnchorIndex;
    /** @internal */
    _builtCompilationString: string;
    /**
     * Gets the emitted compilation strings
     */
    compilationString: string;
    /**
     * Finalize the compilation strings
     * @param state defines the current compilation state
     */
    finalize(state: NodeMaterialBuildState): void;
    /** @internal */
    get _repeatableContentAnchor(): string;
    /**
     * @internal
     */
    _getFreeVariableName(prefix: string): string;
    /**
     * @internal
     */
    _getFreeDefineName(prefix: string): string;
    /**
     * @internal
     */
    _excludeVariableName(name: string): void;
    /**
     * @internal
     */
    _emit2DSampler(name: string): void;
    /**
     * @internal
     */
    _emit2DArraySampler(name: string): void;
    /**
     * @internal
     */
    _getGLType(type: NodeMaterialBlockConnectionPointTypes): string;
    /**
     * @internal
     */
    _emitExtension(name: string, extension: string, define?: string): void;
    /**
     * @internal
     */
    _emitFunction(name: string, code: string, comments: string): void;
    /**
     * @internal
     */
    _emitCodeFromInclude(includeName: string, comments: string, options?: {
        replaceStrings?: {
            search: RegExp;
            replace: string;
        }[];
        repeatKey?: string;
        substitutionVars?: string;
    }): string;
    /**
     * @internal
     */
    _emitFunctionFromInclude(includeName: string, comments: string, options?: {
        repeatKey?: string;
        substitutionVars?: string;
        removeAttributes?: boolean;
        removeUniforms?: boolean;
        removeVaryings?: boolean;
        removeIfDef?: boolean;
        replaceStrings?: {
            search: RegExp;
            replace: string;
        }[];
    }, storeKey?: string): void;
    /**
     * @internal
     */
    _registerTempVariable(name: string): boolean;
    /**
     * @internal
     */
    _emitVaryingFromString(name: string, type: string, define?: string, notDefine?: boolean): boolean;
    /**
     * @internal
     */
    _emitUniformFromString(name: string, type: string, define?: string, notDefine?: boolean): void;
    /**
     * @internal
     */
    _emitFloat(value: number): string;
}
