import type { WebXRSessionManager } from "../webXRSessionManager";
import { WebXRAbstractFeature } from "./WebXRAbstractFeature";
import { WebXRLayerRenderTargetTextureProvider } from "../webXRRenderTargetTextureProvider";
import type { WebXRLayerType } from "../webXRLayerWrapper";
import { WebXRLayerWrapper } from "../webXRLayerWrapper";
import { WebXRWebGLLayerWrapper } from "../webXRWebGLLayer";
/**
 * Wraps xr composition layers.
 * @internal
 */
export declare class WebXRCompositionLayerWrapper extends WebXRLayerWrapper {
    getWidth: () => number;
    getHeight: () => number;
    readonly layer: XRCompositionLayer;
    readonly layerType: WebXRLayerType;
    readonly isMultiview: boolean;
    createRTTProvider: (xrSessionManager: WebXRSessionManager) => WebXRLayerRenderTargetTextureProvider;
    constructor(getWidth: () => number, getHeight: () => number, layer: XRCompositionLayer, layerType: WebXRLayerType, isMultiview: boolean, createRTTProvider: (xrSessionManager: WebXRSessionManager) => WebXRLayerRenderTargetTextureProvider);
}
/**
 * Wraps xr projection layers.
 * @internal
 */
export declare class WebXRProjectionLayerWrapper extends WebXRCompositionLayerWrapper {
    readonly layer: XRProjectionLayer;
    constructor(layer: XRProjectionLayer, isMultiview: boolean, xrGLBinding: XRWebGLBinding);
}
/**
 * Configuration options of the layers feature
 */
export interface IWebXRLayersOptions {
    /**
     * Whether to try initializing the base projection layer as a multiview render target, if multiview is supported.
     * Defaults to false.
     */
    preferMultiviewOnInit?: boolean;
}
/**
 * Exposes the WebXR Layers API.
 */
export declare class WebXRLayers extends WebXRAbstractFeature {
    private readonly _options;
    /**
     * The module's name
     */
    static readonly Name = "xr-layers";
    /**
     * The (Babylon) version of this module.
     * This is an integer representing the implementation version.
     * This number does not correspond to the WebXR specs version
     */
    static readonly Version = 1;
    /**
     * Already-created layers
     */
    private _existingLayers;
    private _glContext;
    private _xrWebGLBinding;
    constructor(_xrSessionManager: WebXRSessionManager, _options?: IWebXRLayersOptions);
    /**
     * Attach this feature.
     * Will usually be called by the features manager.
     *
     * @returns true if successful.
     */
    attach(): boolean;
    detach(): boolean;
    /**
     * Creates a new XRWebGLLayer.
     * @param params an object providing configuration options for the new XRWebGLLayer
     * @returns the XRWebGLLayer
     */
    createXRWebGLLayer(params?: XRWebGLLayerInit): WebXRWebGLLayerWrapper;
    /**
     * Creates a new XRProjectionLayer.
     * @param params an object providing configuration options for the new XRProjectionLayer.
     * @param multiview whether the projection layer should render with multiview.
     * @returns the projection layer
     */
    createProjectionLayer(params?: XRProjectionLayerInit, multiview?: boolean): WebXRProjectionLayerWrapper;
    /**
     * Add a new layer to the already-existing list of layers
     * @param wrappedLayer the new layer to add to the existing ones
     */
    addXRSessionLayer(wrappedLayer: WebXRLayerWrapper): void;
    /**
     * Sets the layers to be used by the XR session.
     * Note that you must call this function with any layers you wish to render to
     * since it adds them to the XR session's render state
     * (replacing any layers that were added in a previous call to setXRSessionLayers or updateRenderState).
     * This method also sets up the session manager's render target texture provider
     * as the first layer in the array, which feeds the WebXR camera(s) attached to the session.
     * @param wrappedLayers An array of WebXRLayerWrapper, usually returned from the WebXRLayers createLayer functions.
     */
    setXRSessionLayers(wrappedLayers: Array<WebXRLayerWrapper>): void;
    isCompatible(): boolean;
    /**
     * Dispose this feature and all of the resources attached.
     */
    dispose(): void;
    protected _onXRFrame(_xrFrame: XRFrame): void;
}
