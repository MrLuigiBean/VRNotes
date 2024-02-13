import type { Engine } from "../../Engines/engine.js";
import type { RenderTargetWrapper } from "../../Engines/renderTargetWrapper.js";
import type { InternalTexture } from "../../Materials/Textures/internalTexture.js";
/** @internal */
export declare class FluidRenderingDepthTextureCopy {
    private _engine;
    private _depthRTWrapper;
    private _copyTextureToTexture;
    get depthRTWrapper(): RenderTargetWrapper;
    constructor(engine: Engine, width: number, height: number, samples?: number);
    copy(source: InternalTexture): boolean;
    dispose(): void;
}
