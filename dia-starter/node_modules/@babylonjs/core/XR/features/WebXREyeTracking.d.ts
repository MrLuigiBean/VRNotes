import { WebXRAbstractFeature } from "./WebXRAbstractFeature";
import type { WebXRSessionManager } from "../webXRSessionManager";
import { Observable } from "../../Misc/observable";
import { Ray } from "../../Culling/ray";
import type { Nullable } from "../../types";
/**
 * The WebXR Eye Tracking feature grabs eye data from the device and provides it in an easy-access format.
 * Currently only enabled for BabylonNative applications.
 */
export declare class WebXREyeTracking extends WebXRAbstractFeature {
    private _latestEyeSpace;
    private _gazeRay;
    /**
     * The module's name
     */
    static readonly Name = "xr-eye-tracking";
    /**
     * The (Babylon) version of this module.
     * This is an integer representing the implementation version.
     * This number does not correspond to the WebXR specs version
     */
    static readonly Version = 1;
    /**
     * This observable will notify registered observers when eye tracking starts
     */
    readonly onEyeTrackingStartedObservable: Observable<Ray>;
    /**
     * This observable will notify registered observers when eye tracking ends
     */
    readonly onEyeTrackingEndedObservable: Observable<void>;
    /**
     * This observable will notify registered observers on each frame that has valid tracking
     */
    readonly onEyeTrackingFrameUpdateObservable: Observable<Ray>;
    /**
     * Creates a new instance of the XR eye tracking feature.
     * @param _xrSessionManager An instance of WebXRSessionManager.
     */
    constructor(_xrSessionManager: WebXRSessionManager);
    /**
     * Dispose this feature and all of the resources attached.
     */
    dispose(): void;
    /**
     * Returns whether the gaze data is valid or not
     * @returns true if the data is valid
     */
    get isEyeGazeValid(): boolean;
    /**
     * Get a reference to the gaze ray. This data is valid while eye tracking persists, and will be set to null when gaze data is no longer available
     * @returns a reference to the gaze ray if it exists and is valid, returns null otherwise.
     */
    getEyeGaze(): Nullable<Ray>;
    protected _onXRFrame(frame: XRFrame): void;
    private _eyeTrackingStartListener;
    private _eyeTrackingEndListener;
    private _init;
}
