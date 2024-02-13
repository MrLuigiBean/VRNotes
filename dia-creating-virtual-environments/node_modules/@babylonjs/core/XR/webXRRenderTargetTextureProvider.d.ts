import { RenderTargetTexture } from "../Materials/Textures/renderTargetTexture";
import type { Viewport } from "../Maths/math.viewport";
import type { IDisposable, Scene } from "../scene";
import type { Nullable } from "../types";
import type { WebXRLayerWrapper } from "./webXRLayerWrapper";
/**
 * An interface for objects that provide render target textures for XR rendering.
 */
export interface IWebXRRenderTargetTextureProvider extends IDisposable {
    /**
     * Attempts to set the framebuffer-size-normalized viewport to be rendered this frame for this view.
     * In the event of a failure, the supplied viewport is not updated.
     * @param viewport the viewport to which the view will be rendered
     * @param view the view for which to set the viewport
     * @returns whether the operation was successful
     */
    trySetViewportForView(viewport: Viewport, view: XRView): boolean;
    /**
     * Gets the correct render target texture to be rendered this frame for this eye
     * @param eye the eye for which to get the render target
     * @returns the render target for the specified eye or null if not available
     */
    getRenderTargetTextureForEye(eye: XREye): Nullable<RenderTargetTexture>;
    /**
     * Gets the correct render target texture to be rendered this frame for this view
     * @param view the view for which to get the render target
     * @returns the render target for the specified view or null if not available
     */
    getRenderTargetTextureForView(view: XRView): Nullable<RenderTargetTexture>;
}
/**
 * Provides render target textures and other important rendering information for a given XRLayer.
 * @internal
 */
export declare abstract class WebXRLayerRenderTargetTextureProvider implements IWebXRRenderTargetTextureProvider {
    private readonly _scene;
    readonly layerWrapper: WebXRLayerWrapper;
    abstract trySetViewportForView(viewport: Viewport, view: XRView): boolean;
    abstract getRenderTargetTextureForEye(eye: XREye): Nullable<RenderTargetTexture>;
    abstract getRenderTargetTextureForView(view: XRView): Nullable<RenderTargetTexture>;
    protected _renderTargetTextures: RenderTargetTexture[];
    protected _framebufferDimensions: Nullable<{
        framebufferWidth: number;
        framebufferHeight: number;
    }>;
    private _engine;
    constructor(_scene: Scene, layerWrapper: WebXRLayerWrapper);
    private _createInternalTexture;
    protected _createRenderTargetTexture(width: number, height: number, framebuffer: Nullable<WebGLFramebuffer>, colorTexture?: WebGLTexture, depthStencilTexture?: WebGLTexture, multiview?: boolean): RenderTargetTexture;
    protected _destroyRenderTargetTexture(renderTargetTexture: RenderTargetTexture): void;
    getFramebufferDimensions(): Nullable<{
        framebufferWidth: number;
        framebufferHeight: number;
    }>;
    dispose(): void;
}
