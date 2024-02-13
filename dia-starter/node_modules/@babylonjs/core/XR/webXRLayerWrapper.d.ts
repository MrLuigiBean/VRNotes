import type { Nullable } from "../types";
import type { WebXRLayerRenderTargetTextureProvider } from "./webXRRenderTargetTextureProvider";
import type { WebXRSessionManager } from "./webXRSessionManager";
/** Covers all supported subclasses of WebXR's XRCompositionLayer */
export type WebXRCompositionLayerType = "XRProjectionLayer";
/** Covers all supported subclasses of WebXR's XRLayer */
export type WebXRLayerType = "XRWebGLLayer" | WebXRCompositionLayerType;
/**
 * Wrapper over subclasses of XRLayer.
 * @internal
 */
export declare class WebXRLayerWrapper {
    /** The width of the layer's framebuffer. */
    getWidth: () => number;
    /** The height of the layer's framebuffer. */
    getHeight: () => number;
    /** The XR layer that this WebXRLayerWrapper wraps. */
    readonly layer: XRLayer;
    /** The type of XR layer that is being wrapped. */
    readonly layerType: WebXRLayerType;
    /** Create a render target provider for the wrapped layer. */
    createRenderTargetTextureProvider: (xrSessionManager: WebXRSessionManager) => WebXRLayerRenderTargetTextureProvider;
    /**
     * Check if fixed foveation is supported on this device
     */
    get isFixedFoveationSupported(): boolean;
    /**
     * Get the fixed foveation currently set, as specified by the webxr specs
     * If this returns null, then fixed foveation is not supported
     */
    get fixedFoveation(): Nullable<number>;
    /**
     * Set the fixed foveation to the specified value, as specified by the webxr specs
     * This value will be normalized to be between 0 and 1, 1 being max foveation, 0 being no foveation
     */
    set fixedFoveation(value: Nullable<number>);
    protected constructor(
    /** The width of the layer's framebuffer. */
    getWidth: () => number, 
    /** The height of the layer's framebuffer. */
    getHeight: () => number, 
    /** The XR layer that this WebXRLayerWrapper wraps. */
    layer: XRLayer, 
    /** The type of XR layer that is being wrapped. */
    layerType: WebXRLayerType, 
    /** Create a render target provider for the wrapped layer. */
    createRenderTargetTextureProvider: (xrSessionManager: WebXRSessionManager) => WebXRLayerRenderTargetTextureProvider);
}
