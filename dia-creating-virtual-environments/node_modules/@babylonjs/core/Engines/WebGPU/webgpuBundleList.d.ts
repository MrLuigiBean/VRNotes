import type { Nullable } from "../../types";
/** @internal */
interface IWebGPURenderItem {
    run(renderPass: GPURenderPassEncoder): void;
    clone(): IWebGPURenderItem;
}
/** @internal */
export declare class WebGPURenderItemViewport implements IWebGPURenderItem {
    x: number;
    y: number;
    w: number;
    h: number;
    constructor(x: number, y: number, w: number, h: number);
    run(renderPass: GPURenderPassEncoder): void;
    clone(): WebGPURenderItemViewport;
}
/** @internal */
export declare class WebGPURenderItemScissor implements IWebGPURenderItem {
    x: number;
    y: number;
    w: number;
    h: number;
    constructor(x: number, y: number, w: number, h: number);
    run(renderPass: GPURenderPassEncoder): void;
    clone(): WebGPURenderItemScissor;
}
/** @internal */
export declare class WebGPURenderItemStencilRef implements IWebGPURenderItem {
    ref: number;
    constructor(ref: number);
    run(renderPass: GPURenderPassEncoder): void;
    clone(): WebGPURenderItemStencilRef;
}
/** @internal */
export declare class WebGPURenderItemBlendColor implements IWebGPURenderItem {
    color: Nullable<number>[];
    constructor(color: Nullable<number>[]);
    run(renderPass: GPURenderPassEncoder): void;
    clone(): WebGPURenderItemBlendColor;
}
/** @internal */
export declare class WebGPURenderItemBeginOcclusionQuery implements IWebGPURenderItem {
    query: number;
    constructor(query: number);
    run(renderPass: GPURenderPassEncoder): void;
    clone(): WebGPURenderItemBeginOcclusionQuery;
}
/** @internal */
export declare class WebGPURenderItemEndOcclusionQuery implements IWebGPURenderItem {
    constructor();
    run(renderPass: GPURenderPassEncoder): void;
    clone(): WebGPURenderItemEndOcclusionQuery;
}
/** @internal */
export declare class WebGPUBundleList {
    private _device;
    private _bundleEncoder;
    private _list;
    private _listLength;
    private _currentItemIsBundle;
    private _currentBundleList;
    numDrawCalls: number;
    constructor(device: GPUDevice);
    addBundle(bundle?: GPURenderBundle): void;
    private _finishBundle;
    addItem(item: IWebGPURenderItem): void;
    getBundleEncoder(colorFormats: (GPUTextureFormat | null)[], depthStencilFormat: GPUTextureFormat | undefined, sampleCount: number): GPURenderBundleEncoder;
    close(): void;
    run(renderPass: GPURenderPassEncoder): void;
    reset(): void;
    clone(): WebGPUBundleList;
}
export {};
