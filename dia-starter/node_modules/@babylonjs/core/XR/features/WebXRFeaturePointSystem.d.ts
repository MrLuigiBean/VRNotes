import type { WebXRSessionManager } from "../webXRSessionManager";
import { Observable } from "../../Misc/observable";
import { Vector3 } from "../../Maths/math.vector";
import { WebXRAbstractFeature } from "./WebXRAbstractFeature";
/**
 * A babylon interface for a "WebXR" feature point.
 * Represents the position and confidence value of a given feature point.
 */
export interface IWebXRFeaturePoint {
    /**
     * Represents the position of the feature point in world space.
     */
    position: Vector3;
    /**
     * Represents the confidence value of the feature point in world space. 0 being least confident, and 1 being most confident.
     */
    confidenceValue: number;
}
/**
 * The feature point system is used to detect feature points from real world geometry.
 * This feature is currently experimental and only supported on BabylonNative, and should not be used in the browser.
 * The newly introduced API can be seen in webxr.nativeextensions.d.ts and described in FeaturePoints.md.
 */
export declare class WebXRFeaturePointSystem extends WebXRAbstractFeature {
    private _enabled;
    private _featurePointCloud;
    /**
     * The module's name
     */
    static readonly Name = "xr-feature-points";
    /**
     * The (Babylon) version of this module.
     * This is an integer representing the implementation version.
     * This number does not correspond to the WebXR specs version
     */
    static readonly Version = 1;
    /**
     * Observers registered here will be executed whenever new feature points are added (on XRFrame while the session is tracking).
     * Will notify the observers about which feature points have been added.
     */
    readonly onFeaturePointsAddedObservable: Observable<number[]>;
    /**
     * Observers registered here will be executed whenever a feature point has been updated (on XRFrame while the session is tracking).
     * Will notify the observers about which feature points have been updated.
     */
    readonly onFeaturePointsUpdatedObservable: Observable<number[]>;
    /**
     * The current feature point cloud maintained across frames.
     */
    get featurePointCloud(): Array<IWebXRFeaturePoint>;
    /**
     * construct the feature point system
     * @param _xrSessionManager an instance of xr Session manager
     */
    constructor(_xrSessionManager: WebXRSessionManager);
    /**
     * Detach this feature.
     * Will usually be called by the features manager
     *
     * @returns true if successful.
     */
    detach(): boolean;
    /**
     * Dispose this feature and all of the resources attached
     */
    dispose(): void;
    /**
     * On receiving a new XR frame if this feature is attached notify observers new feature point data is available.
     * @param frame
     */
    protected _onXRFrame(frame: XRFrame): void;
    /**
     * Initializes the feature. If the feature point feature is not available for this environment do not mark the feature as enabled.
     */
    private _init;
}
