import type { Nullable } from "../types";
/**
 * @internal
 **/
export declare class DepthCullingState {
    protected _isDepthTestDirty: boolean;
    protected _isDepthMaskDirty: boolean;
    protected _isDepthFuncDirty: boolean;
    protected _isCullFaceDirty: boolean;
    protected _isCullDirty: boolean;
    protected _isZOffsetDirty: boolean;
    protected _isFrontFaceDirty: boolean;
    protected _depthTest: boolean;
    protected _depthMask: boolean;
    protected _depthFunc: Nullable<number>;
    protected _cull: Nullable<boolean>;
    protected _cullFace: Nullable<number>;
    protected _zOffset: number;
    protected _zOffsetUnits: number;
    protected _frontFace: Nullable<number>;
    /**
     * Initializes the state.
     * @param reset
     */
    constructor(reset?: boolean);
    get isDirty(): boolean;
    get zOffset(): number;
    set zOffset(value: number);
    get zOffsetUnits(): number;
    set zOffsetUnits(value: number);
    get cullFace(): Nullable<number>;
    set cullFace(value: Nullable<number>);
    get cull(): Nullable<boolean>;
    set cull(value: Nullable<boolean>);
    get depthFunc(): Nullable<number>;
    set depthFunc(value: Nullable<number>);
    get depthMask(): boolean;
    set depthMask(value: boolean);
    get depthTest(): boolean;
    set depthTest(value: boolean);
    get frontFace(): Nullable<number>;
    set frontFace(value: Nullable<number>);
    reset(): void;
    apply(gl: WebGLRenderingContext): void;
}
