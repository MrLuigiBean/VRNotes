/**
 * Options to load the associated Twgsl library
 */
export interface TwgslOptions {
    /**
     * Defines an existing instance of Twgsl (useful in modules who do not access the global instance).
     */
    twgsl?: any;
    /**
     * Defines the URL of the twgsl JS File.
     */
    jsPath?: string;
    /**
     * Defines the URL of the twgsl WASM File.
     */
    wasmPath?: string;
}
/** @internal */
export declare class WebGPUTintWASM {
    private static readonly _TWgslDefaultOptions;
    static ShowWGSLShaderCode: boolean;
    static DisableUniformityAnalysis: boolean;
    private static _Twgsl;
    initTwgsl(twgslOptions?: TwgslOptions): Promise<void>;
    convertSpirV2WGSL(code: Uint32Array, disableUniformityAnalysis?: boolean): string;
}
