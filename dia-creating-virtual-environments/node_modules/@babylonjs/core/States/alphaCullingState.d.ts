import type { Nullable } from "../types";
/**
 * @internal
 **/
export declare class AlphaState {
    _blendFunctionParameters: Nullable<number>[];
    _blendEquationParameters: Nullable<number>[];
    _blendConstants: Nullable<number>[];
    _isBlendConstantsDirty: boolean;
    private _alphaBlend;
    private _isAlphaBlendDirty;
    private _isBlendFunctionParametersDirty;
    private _isBlendEquationParametersDirty;
    /**
     * Initializes the state.
     */
    constructor();
    get isDirty(): boolean;
    get alphaBlend(): boolean;
    set alphaBlend(value: boolean);
    setAlphaBlendConstants(r: number, g: number, b: number, a: number): void;
    setAlphaBlendFunctionParameters(value0: number, value1: number, value2: number, value3: number): void;
    setAlphaEquationParameters(rgb: number, alpha: number): void;
    reset(): void;
    apply(gl: WebGLRenderingContext): void;
}
