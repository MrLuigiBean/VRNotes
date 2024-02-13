import type { IStencilState } from "./IStencilState";
/**
 * @internal
 **/
export declare class StencilStateComposer {
    protected _isStencilTestDirty: boolean;
    protected _isStencilMaskDirty: boolean;
    protected _isStencilFuncDirty: boolean;
    protected _isStencilOpDirty: boolean;
    protected _enabled: boolean;
    protected _mask: number;
    protected _func: number;
    protected _funcRef: number;
    protected _funcMask: number;
    protected _opStencilFail: number;
    protected _opDepthFail: number;
    protected _opStencilDepthPass: number;
    stencilGlobal: IStencilState;
    stencilMaterial: IStencilState | undefined;
    useStencilGlobalOnly: boolean;
    get isDirty(): boolean;
    get func(): number;
    set func(value: number);
    get funcRef(): number;
    set funcRef(value: number);
    get funcMask(): number;
    set funcMask(value: number);
    get opStencilFail(): number;
    set opStencilFail(value: number);
    get opDepthFail(): number;
    set opDepthFail(value: number);
    get opStencilDepthPass(): number;
    set opStencilDepthPass(value: number);
    get mask(): number;
    set mask(value: number);
    get enabled(): boolean;
    set enabled(value: boolean);
    constructor(reset?: boolean);
    reset(): void;
    apply(gl?: WebGLRenderingContext): void;
}
