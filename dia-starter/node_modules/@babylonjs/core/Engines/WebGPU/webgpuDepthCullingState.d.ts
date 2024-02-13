import type { Nullable } from "../../types";
import type { WebGPUCacheRenderPipeline } from "./webgpuCacheRenderPipeline";
import { DepthCullingState } from "../../States/depthCullingState";
/**
 * @internal
 **/
export declare class WebGPUDepthCullingState extends DepthCullingState {
    private _cache;
    /**
     * Initializes the state.
     * @param cache
     */
    constructor(cache: WebGPUCacheRenderPipeline);
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
    apply(): void;
}
