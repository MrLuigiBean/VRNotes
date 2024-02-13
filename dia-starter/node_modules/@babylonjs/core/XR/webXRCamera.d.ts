import { Vector3 } from "../Maths/math.vector";
import type { Scene } from "../scene";
import { Camera } from "../Cameras/camera";
import { FreeCamera } from "../Cameras/freeCamera";
import type { WebXRSessionManager } from "./webXRSessionManager";
import { Observable } from "../Misc/observable";
import { WebXRTrackingState } from "./webXRTypes";
/**
 * WebXR Camera which holds the views for the xrSession
 * @see https://doc.babylonjs.com/features/featuresDeepDive/webXR/webXRCamera
 */
export declare class WebXRCamera extends FreeCamera {
    private _xrSessionManager;
    private static _ScaleReadOnly;
    private _firstFrame;
    private _referenceQuaternion;
    private _referencedPosition;
    private _trackingState;
    /**
     * This will be triggered after the first XR Frame initialized the camera,
     * including the right number of views and their rendering parameters
     */
    onXRCameraInitializedObservable: Observable<WebXRCamera>;
    /**
     * Observable raised before camera teleportation
     */
    onBeforeCameraTeleport: Observable<Vector3>;
    /**
     *  Observable raised after camera teleportation
     */
    onAfterCameraTeleport: Observable<Vector3>;
    /**
     * Notifies when the camera's tracking state has changed.
     * Notice - will also be triggered when tracking has started (at the beginning of the session)
     */
    onTrackingStateChanged: Observable<WebXRTrackingState>;
    /**
     * Should position compensation execute on first frame.
     * This is used when copying the position from a native (non XR) camera
     */
    compensateOnFirstFrame: boolean;
    /**
     * The last XRViewerPose from the current XRFrame
     * @internal
     */
    _lastXRViewerPose?: XRViewerPose;
    /**
     * Creates a new webXRCamera, this should only be set at the camera after it has been updated by the xrSessionManager
     * @param name the name of the camera
     * @param scene the scene to add the camera to
     * @param _xrSessionManager a constructed xr session manager
     */
    constructor(name: string, scene: Scene, _xrSessionManager: WebXRSessionManager);
    /**
     * Get the current XR tracking state of the camera
     */
    get trackingState(): WebXRTrackingState;
    private _setTrackingState;
    /**
     * Return the user's height, unrelated to the current ground.
     * This will be the y position of this camera, when ground level is 0.
     */
    get realWorldHeight(): number;
    /** @internal */
    _updateForDualEyeDebugging(): void;
    /**
     * Sets this camera's transformation based on a non-vr camera
     * @param otherCamera the non-vr camera to copy the transformation from
     * @param resetToBaseReferenceSpace should XR reset to the base reference space
     */
    setTransformationFromNonVRCamera(otherCamera?: Camera, resetToBaseReferenceSpace?: boolean): void;
    /**
     * Gets the current instance class name ("WebXRCamera").
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Set the target for the camera to look at.
     * Note that this only rotates around the Y axis, as opposed to the default behavior of other cameras
     * @param target the target to set the camera to look at
     */
    setTarget(target: Vector3): void;
    dispose(): void;
    private _rotate180;
    private _updateFromXRSession;
    private _updateNumberOfRigCameras;
    private _updateReferenceSpace;
}
