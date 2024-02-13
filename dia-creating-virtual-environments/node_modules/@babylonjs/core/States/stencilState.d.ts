import type { IStencilState } from "./IStencilState";
/**
 * @internal
 **/
export declare class StencilState implements IStencilState {
    /** Passed to depthFunction or stencilFunction to specify depth or stencil tests will always pass. i.e. Pixels will be drawn in the order they are drawn */
    static readonly ALWAYS = 519;
    /** Passed to stencilOperation to specify that stencil value must be kept */
    static readonly KEEP = 7680;
    /** Passed to stencilOperation to specify that stencil value must be replaced */
    static readonly REPLACE = 7681;
    constructor();
    reset(): void;
    func: number;
    get stencilFunc(): number;
    set stencilFunc(value: number);
    funcRef: number;
    get stencilFuncRef(): number;
    set stencilFuncRef(value: number);
    funcMask: number;
    get stencilFuncMask(): number;
    set stencilFuncMask(value: number);
    opStencilFail: number;
    get stencilOpStencilFail(): number;
    set stencilOpStencilFail(value: number);
    opDepthFail: number;
    get stencilOpDepthFail(): number;
    set stencilOpDepthFail(value: number);
    opStencilDepthPass: number;
    get stencilOpStencilDepthPass(): number;
    set stencilOpStencilDepthPass(value: number);
    mask: number;
    get stencilMask(): number;
    set stencilMask(value: number);
    enabled: boolean;
    get stencilTest(): boolean;
    set stencilTest(value: boolean);
}
