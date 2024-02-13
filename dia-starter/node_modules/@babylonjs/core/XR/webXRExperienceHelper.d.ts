import { Observable } from "../Misc/observable";
import type { IDisposable, Scene } from "../scene";
import { WebXRSessionManager } from "./webXRSessionManager";
import { WebXRCamera } from "./webXRCamera";
import type { WebXRRenderTarget } from "./webXRTypes";
import { WebXRState } from "./webXRTypes";
import { WebXRFeaturesManager } from "./webXRFeaturesManager";
/**
 * Options for setting up XR spectator camera.
 */
export interface WebXRSpectatorModeOption {
    /**
     * Expected refresh rate (frames per sec) for a spectator camera.
     */
    fps?: number;
    /**
     * The index of rigCameras array in a WebXR camera.
     */
    preferredCameraIndex?: number;
}
/**
 * Base set of functionality needed to create an XR experience (WebXRSessionManager, Camera, StateManagement, etc.)
 * @see https://doc.babylonjs.com/features/featuresDeepDive/webXR/webXRExperienceHelpers
 */
export declare class WebXRExperienceHelper implements IDisposable {
    private _scene;
    private _nonVRCamera;
    private _attachedToElement;
    private _spectatorCamera;
    private _originalSceneAutoClear;
    private _supported;
    private _spectatorMode;
    private _lastTimestamp;
    /**
     * Camera used to render xr content
     */
    camera: WebXRCamera;
    /** A features manager for this xr session */
    featuresManager: WebXRFeaturesManager;
    /**
     * Observers registered here will be triggered after the camera's initial transformation is set
     * This can be used to set a different ground level or an extra rotation.
     *
     * Note that ground level is considered to be at 0. The height defined by the XR camera will be added
     * to the position set after this observable is done executing.
     */
    onInitialXRPoseSetObservable: Observable<WebXRCamera>;
    /**
     * Fires when the state of the experience helper has changed
     */
    onStateChangedObservable: Observable<WebXRState>;
    /** Session manager used to keep track of xr session */
    sessionManager: WebXRSessionManager;
    /**
     * The current state of the XR experience (eg. transitioning, in XR or not in XR)
     */
    state: WebXRState;
    /**
     * Creates a WebXRExperienceHelper
     * @param _scene The scene the helper should be created in
     */
    private constructor();
    /**
     * Creates the experience helper
     * @param scene the scene to attach the experience helper to
     * @returns a promise for the experience helper
     */
    static CreateAsync(scene: Scene): Promise<WebXRExperienceHelper>;
    /**
     * Disposes of the experience helper
     */
    dispose(): void;
    /**
     * Enters XR mode (This must be done within a user interaction in most browsers eg. button click)
     * @param sessionMode options for the XR session
     * @param referenceSpaceType frame of reference of the XR session
     * @param renderTarget the output canvas that will be used to enter XR mode
     * @param sessionCreationOptions optional XRSessionInit object to init the session with
     * @returns promise that resolves after xr mode has entered
     */
    enterXRAsync(sessionMode: XRSessionMode, referenceSpaceType: XRReferenceSpaceType, renderTarget?: WebXRRenderTarget, sessionCreationOptions?: XRSessionInit): Promise<WebXRSessionManager>;
    /**
     * Exits XR mode and returns the scene to its original state
     * @returns promise that resolves after xr mode has exited
     */
    exitXRAsync(): Promise<void>;
    /**
     * Enable spectator mode for desktop VR experiences.
     * When spectator mode is enabled a camera will be attached to the desktop canvas and will
     * display the first rig camera's view on the desktop canvas.
     * Please note that this will degrade performance, as it requires another camera render.
     * It is also not recommended to enable this in devices like the quest, as it brings no benefit there.
     * @param options giving WebXRSpectatorModeOption for specutator camera to setup when the spectator mode is enabled.
     */
    enableSpectatorMode(options?: WebXRSpectatorModeOption): void;
    /**
     * Disable spectator mode for desktop VR experiences.
     */
    disableSpecatatorMode(): void;
    private _switchSpectatorMode;
    private _nonXRToXRCamera;
    private _setState;
}
