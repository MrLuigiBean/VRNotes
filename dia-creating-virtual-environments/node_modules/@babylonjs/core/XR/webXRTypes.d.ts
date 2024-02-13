import type { Nullable } from "../types";
import type { IDisposable } from "../scene";
/**
 * States of the webXR experience
 */
export declare enum WebXRState {
    /**
     * Transitioning to being in XR mode
     */
    ENTERING_XR = 0,
    /**
     * Transitioning to non XR mode
     */
    EXITING_XR = 1,
    /**
     * In XR mode and presenting
     */
    IN_XR = 2,
    /**
     * Not entered XR mode
     */
    NOT_IN_XR = 3
}
/**
 * The state of the XR camera's tracking
 */
export declare enum WebXRTrackingState {
    /**
     * No transformation received, device is not being tracked
     */
    NOT_TRACKING = 0,
    /**
     * Tracking lost - using emulated position
     */
    TRACKING_LOST = 1,
    /**
     * Transformation tracking works normally
     */
    TRACKING = 2
}
/**
 * Abstraction of the XR render target
 */
export interface WebXRRenderTarget extends IDisposable {
    /**
     * xrpresent context of the canvas which can be used to display/mirror xr content
     */
    canvasContext: WebGLRenderingContext;
    /**
     * xr layer for the canvas
     */
    xrLayer: Nullable<XRWebGLLayer>;
    /**
     * Initializes a XRWebGLLayer to be used as the session's baseLayer.
     * @param xrSession xr session
     * @returns a promise that will resolve once the XR Layer has been created
     */
    initializeXRLayerAsync(xrSession: XRSession): Promise<XRWebGLLayer>;
}
