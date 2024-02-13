import type { WebGPUEngine } from "../webgpuEngine";
import type { WebGPUBundleList } from "./webgpuBundleList";
/** @internal */
export declare class WebGPUSnapshotRendering {
    private _engine;
    private _record;
    private _play;
    private _playBundleListIndex;
    private _allBundleLists;
    private _modeSaved;
    private _bundleList;
    private _enabled;
    private _mode;
    constructor(engine: WebGPUEngine, renderingMode: number, bundleList: WebGPUBundleList);
    get enabled(): boolean;
    get play(): boolean;
    get record(): boolean;
    set enabled(activate: boolean);
    get mode(): number;
    set mode(mode: number);
    endRenderPass(currentRenderPass: GPURenderPassEncoder): boolean;
    endFrame(): void;
    reset(): void;
}
