import { RenderTargetTexture } from "../Textures/renderTargetTexture";
import type { Scene } from "../../scene";
/**
 * Renders to multiple views with a single draw call
 * @see https://www.khronos.org/registry/webgl/extensions/OVR_multiview2/
 */
export declare class MultiviewRenderTarget extends RenderTargetTexture {
    set samples(value: number);
    get samples(): number;
    /**
     * Creates a multiview render target
     * @param scene scene used with the render target
     * @param size the size of the render target (used for each view)
     */
    constructor(scene?: Scene, size?: number | {
        width: number;
        height: number;
    } | {
        ratio: number;
    });
    /**
     * @internal
     */
    _bindFrameBuffer(): void;
    /**
     * Gets the number of views the corresponding to the texture (eg. a MultiviewRenderTarget will have > 1)
     * @returns the view count
     */
    getViewCount(): number;
}
