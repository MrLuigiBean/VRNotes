import type { Nullable } from "../../types";
import { WebGPUCacheRenderPipeline } from "./webgpuCacheRenderPipeline";
/** @internal */
declare class NodeState {
    values: {
        [id: number]: NodeState;
    };
    pipeline: GPURenderPipeline;
    constructor();
    count(): [number, number];
}
/** @internal */
export declare class WebGPUCacheRenderPipelineTree extends WebGPUCacheRenderPipeline {
    private static _Cache;
    private _nodeStack;
    static GetNodeCounts(): {
        nodeCount: number;
        pipelineCount: number;
    };
    static _GetPipelines(node: NodeState, pipelines: Array<Array<number>>, curPath: Array<number>, curPathLen: number): void;
    static GetPipelines(): Array<Array<number>>;
    static ResetCache(): void;
    reset(): void;
    protected _getRenderPipeline(param: {
        token: any;
        pipeline: Nullable<GPURenderPipeline>;
    }): void;
    protected _setRenderPipeline(param: {
        token: NodeState;
        pipeline: Nullable<GPURenderPipeline>;
    }): void;
}
export {};
