import type { Nullable } from "../types";
import { Observable } from "../Misc/observable";
import type { IComputePipelineContext } from "./IComputePipelineContext";
import type { Engine } from "../Engines/engine";
/**
 * Options to be used when creating a compute effect.
 */
export interface IComputeEffectCreationOptions {
    /**
     * Define statements that will be set in the shader.
     */
    defines: any;
    /**
     * The name of the entry point in the shader source (default: "main")
     */
    entryPoint?: string;
    /**
     * Callback that will be called when the shader is compiled.
     */
    onCompiled: Nullable<(effect: ComputeEffect) => void>;
    /**
     * Callback that will be called if an error occurs during shader compilation.
     */
    onError: Nullable<(effect: ComputeEffect, errors: string) => void>;
    /**
     * If provided, will be called with the shader code so that this code can be updated before it is compiled by the GPU
     */
    processFinalCode?: Nullable<(code: string) => string>;
}
/**
 * Effect wrapping a compute shader and let execute (dispatch) the shader
 */
export declare class ComputeEffect {
    private static _UniqueIdSeed;
    /**
     * Enable logging of the shader code when a compilation error occurs
     */
    static LogShaderCodeOnCompilationError: boolean;
    /**
     * Name of the effect.
     */
    name: any;
    /**
     * String container all the define statements that should be set on the shader.
     */
    defines: string;
    /**
     * Callback that will be called when the shader is compiled.
     */
    onCompiled: Nullable<(effect: ComputeEffect) => void>;
    /**
     * Callback that will be called if an error occurs during shader compilation.
     */
    onError: Nullable<(effect: ComputeEffect, errors: string) => void>;
    /**
     * Unique ID of the effect.
     */
    uniqueId: number;
    /**
     * Observable that will be called when the shader is compiled.
     * It is recommended to use executeWhenCompile() or to make sure that scene.isReady() is called to get this observable raised.
     */
    onCompileObservable: Observable<ComputeEffect>;
    /**
     * Observable that will be called if an error occurs during shader compilation.
     */
    onErrorObservable: Observable<ComputeEffect>;
    /**
     * Observable that will be called when effect is bound.
     */
    onBindObservable: Observable<ComputeEffect>;
    /**
     * @internal
     * Specifies if the effect was previously ready
     */
    _wasPreviouslyReady: boolean;
    private _engine;
    private _isReady;
    private _compilationError;
    /** @internal */
    _key: string;
    private _computeSourceCodeOverride;
    /** @internal */
    _pipelineContext: Nullable<IComputePipelineContext>;
    /** @internal */
    _computeSourceCode: string;
    private _rawComputeSourceCode;
    private _entryPoint;
    private _shaderLanguage;
    private _shaderStore;
    private _shaderRepository;
    private _includeShaderStore;
    /**
     * Creates a compute effect that can be used to execute a compute shader
     * @param baseName Name of the effect
     * @param options Set of all options to create the effect
     * @param engine The engine the effect is created for
     * @param key Effect Key identifying uniquely compiled shader variants
     */
    constructor(baseName: any, options: IComputeEffectCreationOptions, engine: Engine, key?: string);
    private _useFinalCode;
    /**
     * Unique key for this effect
     */
    get key(): string;
    /**
     * If the effect has been compiled and prepared.
     * @returns if the effect is compiled and prepared.
     */
    isReady(): boolean;
    private _isReadyInternal;
    /**
     * The engine the effect was initialized with.
     * @returns the engine.
     */
    getEngine(): Engine;
    /**
     * The pipeline context for this effect
     * @returns the associated pipeline context
     */
    getPipelineContext(): Nullable<IComputePipelineContext>;
    /**
     * The error from the last compilation.
     * @returns the error string.
     */
    getCompilationError(): string;
    /**
     * Adds a callback to the onCompiled observable and call the callback immediately if already ready.
     * @param func The callback to be used.
     */
    executeWhenCompiled(func: (effect: ComputeEffect) => void): void;
    private _checkIsReady;
    private _loadShader;
    /**
     * Gets the compute shader source code of this effect
     */
    get computeSourceCode(): string;
    /**
     * Gets the compute shader source code before it has been processed by the preprocessor
     */
    get rawComputeSourceCode(): string;
    /**
     * Prepares the effect
     * @internal
     */
    _prepareEffect(): void;
    private _getShaderCodeAndErrorLine;
    private _processCompilationErrors;
    /**
     * Release all associated resources.
     **/
    dispose(): void;
    /**
     * This function will add a new compute shader to the shader store
     * @param name the name of the shader
     * @param computeShader compute shader content
     */
    static RegisterShader(name: string, computeShader: string): void;
}
