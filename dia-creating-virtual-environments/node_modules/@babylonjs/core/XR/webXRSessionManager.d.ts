import { Observable } from "../Misc/observable";
import type { Nullable } from "../types";
import type { IDisposable, Scene } from "../scene";
import type { RenderTargetTexture } from "../Materials/Textures/renderTargetTexture";
import type { WebXRRenderTarget } from "./webXRTypes";
import { WebXRManagedOutputCanvasOptions } from "./webXRManagedOutputCanvas";
import type { IWebXRRenderTargetTextureProvider } from "./webXRRenderTargetTextureProvider";
import type { Viewport } from "../Maths/math.viewport";
import type { WebXRLayerWrapper } from "./webXRLayerWrapper";
/**
 * Manages an XRSession to work with Babylon's engine
 * @see https://doc.babylonjs.com/features/featuresDeepDive/webXR/webXRSessionManagers
 */
export declare class WebXRSessionManager implements IDisposable, IWebXRRenderTargetTextureProvider {
    /** The scene which the session should be created for */
    scene: Scene;
    private _engine;
    private _referenceSpace;
    private _baseLayerWrapper;
    private _baseLayerRTTProvider;
    private _xrNavigator;
    private _sessionMode;
    private _onEngineDisposedObserver;
    /**
     * The base reference space from which the session started. good if you want to reset your
     * reference space
     */
    baseReferenceSpace: XRReferenceSpace;
    /**
     * Current XR frame
     */
    currentFrame: Nullable<XRFrame>;
    /** WebXR timestamp updated every frame */
    currentTimestamp: number;
    /**
     * Used just in case of a failure to initialize an immersive session.
     * The viewer reference space is compensated using this height, creating a kind of "viewer-floor" reference space
     */
    defaultHeightCompensation: number;
    /**
     * Fires every time a new xrFrame arrives which can be used to update the camera
     */
    onXRFrameObservable: Observable<XRFrame>;
    /**
     * Fires when the reference space changed
     */
    onXRReferenceSpaceChanged: Observable<XRReferenceSpace>;
    /**
     * Fires when the xr session is ended either by the device or manually done
     */
    onXRSessionEnded: Observable<any>;
    /**
     * Fires when the xr session is initialized: right after requestSession was called and returned with a successful result
     */
    onXRSessionInit: Observable<XRSession>;
    /**
     * Underlying xr session
     */
    session: XRSession;
    /**
     * The viewer (head position) reference space. This can be used to get the XR world coordinates
     * or get the offset the player is currently at.
     */
    viewerReferenceSpace: XRReferenceSpace;
    /**
     * Are we currently in the XR loop?
     */
    inXRFrameLoop: boolean;
    /**
     * Are we in an XR session?
     */
    inXRSession: boolean;
    /**
     * Constructs a WebXRSessionManager, this must be initialized within a user action before usage
     * @param scene The scene which the session should be created for
     */
    constructor(
    /** The scene which the session should be created for */
    scene: Scene);
    /**
     * The current reference space used in this session. This reference space can constantly change!
     * It is mainly used to offset the camera's position.
     */
    get referenceSpace(): XRReferenceSpace;
    /**
     * Set a new reference space and triggers the observable
     */
    set referenceSpace(newReferenceSpace: XRReferenceSpace);
    /**
     * The mode for the managed XR session
     */
    get sessionMode(): XRSessionMode;
    /**
     * Disposes of the session manager
     * This should be called explicitly by the dev, if required.
     */
    dispose(): void;
    /**
     * Stops the xrSession and restores the render loop
     * @returns Promise which resolves after it exits XR
     */
    exitXRAsync(): Promise<void>;
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
    /**
     * Creates a WebXRRenderTarget object for the XR session
     * @param options optional options to provide when creating a new render target
     * @returns a WebXR render target to which the session can render
     */
    getWebXRRenderTarget(options?: WebXRManagedOutputCanvasOptions): WebXRRenderTarget;
    /**
     * Initializes the manager
     * After initialization enterXR can be called to start an XR session
     * @returns Promise which resolves after it is initialized
     */
    initializeAsync(): Promise<void>;
    /**
     * Initializes an xr session
     * @param xrSessionMode mode to initialize
     * @param xrSessionInit defines optional and required values to pass to the session builder
     * @returns a promise which will resolve once the session has been initialized
     */
    initializeSessionAsync(xrSessionMode?: XRSessionMode, xrSessionInit?: XRSessionInit): Promise<XRSession>;
    /**
     * Checks if a session would be supported for the creation options specified
     * @param sessionMode session mode to check if supported eg. immersive-vr
     * @returns A Promise that resolves to true if supported and false if not
     */
    isSessionSupportedAsync(sessionMode: XRSessionMode): Promise<boolean>;
    /**
     * Resets the reference space to the one started the session
     */
    resetReferenceSpace(): void;
    /**
     * Starts rendering to the xr layer
     */
    runXRRenderLoop(): void;
    /**
     * Sets the reference space on the xr session
     * @param referenceSpaceType space to set
     * @returns a promise that will resolve once the reference space has been set
     */
    setReferenceSpaceTypeAsync(referenceSpaceType?: XRReferenceSpaceType): Promise<XRReferenceSpace>;
    /**
     * Updates the render state of the session.
     * Note that this is deprecated in favor of WebXRSessionManager.updateRenderState().
     * @param state state to set
     * @returns a promise that resolves once the render state has been updated
     * @deprecated
     */
    updateRenderStateAsync(state: XRRenderState): Promise<void>;
    /**
     * @internal
     */
    _setBaseLayerWrapper(baseLayerWrapper: Nullable<WebXRLayerWrapper>): void;
    /**
     * @internal
     */
    _getBaseLayerWrapper(): Nullable<WebXRLayerWrapper>;
    /**
     * Updates the render state of the session
     * @param state state to set
     */
    updateRenderState(state: XRRenderStateInit): void;
    /**
     * Returns a promise that resolves with a boolean indicating if the provided session mode is supported by this browser
     * @param sessionMode defines the session to test
     * @returns a promise with boolean as final value
     */
    static IsSessionSupportedAsync(sessionMode: XRSessionMode): Promise<boolean>;
    /**
     * Returns true if Babylon.js is using the BabylonNative backend, otherwise false
     */
    get isNative(): boolean;
    /**
     * The current frame rate as reported by the device
     */
    get currentFrameRate(): number | undefined;
    /**
     * A list of supported frame rates (only available in-session!
     */
    get supportedFrameRates(): Float32Array | undefined;
    /**
     * Set the framerate of the session.
     * @param rate the new framerate. This value needs to be in the supportedFrameRates array
     * @returns a promise that resolves once the framerate has been set
     */
    updateTargetFrameRate(rate: number): Promise<void>;
    /**
     * Run a callback in the xr render loop
     * @param callback the callback to call when in XR Frame
     * @param ignoreIfNotInSession if no session is currently running, run it first thing on the next session
     */
    runInXRFrame(callback: () => void, ignoreIfNotInSession?: boolean): void;
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
    /**
     * Get the features enabled on the current session
     * This is only available in-session!
     * @see https://www.w3.org/TR/webxr/#dom-xrsession-enabledfeatures
     */
    get enabledFeatures(): Nullable<string[]>;
}
