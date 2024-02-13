import type { WebXRSessionManager } from "../webXRSessionManager";
import { Observable } from "../../Misc/observable";
import { Vector3, Quaternion } from "../../Maths/math.vector";
import { WebXRAbstractFeature } from "./WebXRAbstractFeature";
import type { IWebXRLegacyHitTestOptions, IWebXRLegacyHitResult, IWebXRHitTestFeature } from "./WebXRHitTestLegacy";
/**
 * Options used for hit testing (version 2)
 */
export interface IWebXRHitTestOptions extends IWebXRLegacyHitTestOptions {
    /**
     * Do not create a permanent hit test. Will usually be used when only
     * transient inputs are needed.
     */
    disablePermanentHitTest?: boolean;
    /**
     * Enable transient (for example touch-based) hit test inspections
     */
    enableTransientHitTest?: boolean;
    /**
     * Override the default transient hit test profile (generic-touchscreen).
     */
    transientHitTestProfile?: string;
    /**
     * Offset ray for the permanent hit test
     */
    offsetRay?: Vector3;
    /**
     * Offset ray for the transient hit test
     */
    transientOffsetRay?: Vector3;
    /**
     * Instead of using viewer space for hit tests, use the reference space defined in the session manager
     */
    useReferenceSpace?: boolean;
    /**
     * Override the default entity type(s) of the hit-test result
     */
    entityTypes?: XRHitTestTrackableType[];
}
/**
 * Interface defining the babylon result of hit-test
 */
export interface IWebXRHitResult extends IWebXRLegacyHitResult {
    /**
     * The input source that generated this hit test (if transient)
     */
    inputSource?: XRInputSource;
    /**
     * Is this a transient hit test
     */
    isTransient?: boolean;
    /**
     * Position of the hit test result
     */
    position: Vector3;
    /**
     * Rotation of the hit test result
     */
    rotationQuaternion: Quaternion;
    /**
     * The native hit test result
     */
    xrHitResult: XRHitTestResult;
}
/**
 * The currently-working hit-test module.
 * Hit test (or Ray-casting) is used to interact with the real world.
 * For further information read here - https://github.com/immersive-web/hit-test
 *
 * Tested on chrome (mobile) 80.
 */
export declare class WebXRHitTest extends WebXRAbstractFeature implements IWebXRHitTestFeature<IWebXRHitResult> {
    /**
     * options to use when constructing this feature
     */
    readonly options: IWebXRHitTestOptions;
    private _tmpMat;
    private _tmpPos;
    private _tmpQuat;
    private _transientXrHitTestSource;
    private _xrHitTestSource;
    private _initHitTestSource;
    /**
     * The module's name
     */
    static readonly Name = "xr-hit-test";
    /**
     * The (Babylon) version of this module.
     * This is an integer representing the implementation version.
     * This number does not correspond to the WebXR specs version
     */
    static readonly Version = 2;
    /**
     * When set to true, each hit test will have its own position/rotation objects
     * When set to false, position and rotation objects will be reused for each hit test. It is expected that
     * the developers will clone them or copy them as they see fit.
     */
    autoCloneTransformation: boolean;
    /**
     * Triggered when new babylon (transformed) hit test results are available
     * Note - this will be called when results come back from the device. It can be an empty array!!
     */
    onHitTestResultObservable: Observable<IWebXRHitResult[]>;
    /**
     * Use this to temporarily pause hit test checks.
     */
    paused: boolean;
    /**
     * Creates a new instance of the hit test feature
     * @param _xrSessionManager an instance of WebXRSessionManager
     * @param options options to use when constructing this feature
     */
    constructor(_xrSessionManager: WebXRSessionManager, 
    /**
     * options to use when constructing this feature
     */
    options?: IWebXRHitTestOptions);
    /**
     * attach this feature
     * Will usually be called by the features manager
     *
     * @returns true if successful.
     */
    attach(): boolean;
    /**
     * detach this feature.
     * Will usually be called by the features manager
     *
     * @returns true if successful.
     */
    detach(): boolean;
    /**
     * Dispose this feature and all of the resources attached
     */
    dispose(): void;
    protected _onXRFrame(frame: XRFrame): void;
    private _processWebXRHitTestResult;
}
