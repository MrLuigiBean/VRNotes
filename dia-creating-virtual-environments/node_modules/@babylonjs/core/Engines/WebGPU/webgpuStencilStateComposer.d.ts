import type { WebGPUCacheRenderPipeline } from "./webgpuCacheRenderPipeline";
import { StencilStateComposer } from "../../States/stencilStateComposer";
/**
 * @internal
 **/
export declare class WebGPUStencilStateComposer extends StencilStateComposer {
    private _cache;
    constructor(cache: WebGPUCacheRenderPipeline);
    get func(): number;
    set func(value: number);
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
    reset(): void;
    apply(): void;
}
