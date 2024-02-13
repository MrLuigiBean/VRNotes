import type { WebXRSessionManager } from "../webXRSessionManager";
import { Observable } from "../../Misc/observable";
import { Matrix, Vector3, Quaternion } from "../../Maths/math.vector";
import type { TransformNode } from "../../Meshes/transformNode";
import { WebXRAbstractFeature } from "./WebXRAbstractFeature";
import type { IWebXRHitResult } from "./WebXRHitTest";
/**
 * Configuration options of the anchor system
 */
export interface IWebXRAnchorSystemOptions {
    /**
     * a node that will be used to convert local to world coordinates
     */
    worldParentNode?: TransformNode;
    /**
     * If set to true a reference of the created anchors will be kept until the next session starts
     * If not defined, anchors will be removed from the array when the feature is detached or the session ended.
     */
    doNotRemoveAnchorsOnSessionEnded?: boolean;
}
/**
 * A babylon container for an XR Anchor
 */
export interface IWebXRAnchor {
    /**
     * A babylon-assigned ID for this anchor
     */
    id: number;
    /**
     * Transformation matrix to apply to an object attached to this anchor
     */
    transformationMatrix: Matrix;
    /**
     * The native anchor object
     */
    xrAnchor: XRAnchor;
    /**
     * if defined, this object will be constantly updated by the anchor's position and rotation
     */
    attachedNode?: TransformNode;
    /**
     * Remove this anchor from the scene
     */
    remove(): void;
}
/**
 * An implementation of the anchor system for WebXR.
 * For further information see https://github.com/immersive-web/anchors/
 */
export declare class WebXRAnchorSystem extends WebXRAbstractFeature {
    private _options;
    private _lastFrameDetected;
    private _trackedAnchors;
    private _referenceSpaceForFrameAnchors;
    private _futureAnchors;
    /**
     * The module's name
     */
    static readonly Name = "xr-anchor-system";
    /**
     * The (Babylon) version of this module.
     * This is an integer representing the implementation version.
     * This number does not correspond to the WebXR specs version
     */
    static readonly Version = 1;
    /**
     * Observers registered here will be executed when a new anchor was added to the session
     */
    onAnchorAddedObservable: Observable<IWebXRAnchor>;
    /**
     * Observers registered here will be executed when an anchor was removed from the session
     */
    onAnchorRemovedObservable: Observable<IWebXRAnchor>;
    /**
     * Observers registered here will be executed when an existing anchor updates
     * This can execute N times every frame
     */
    onAnchorUpdatedObservable: Observable<IWebXRAnchor>;
    /**
     * Set the reference space to use for anchor creation, when not using a hit test.
     * Will default to the session's reference space if not defined
     */
    set referenceSpaceForFrameAnchors(referenceSpace: XRReferenceSpace);
    /**
     * constructs a new anchor system
     * @param _xrSessionManager an instance of WebXRSessionManager
     * @param _options configuration object for this feature
     */
    constructor(_xrSessionManager: WebXRSessionManager, _options?: IWebXRAnchorSystemOptions);
    private _tmpVector;
    private _tmpQuaternion;
    private _populateTmpTransformation;
    /**
     * Create a new anchor point using a hit test result at a specific point in the scene
     * An anchor is tracked only after it is added to the trackerAnchors in xrFrame. The promise returned here does not yet guaranty that.
     * Use onAnchorAddedObservable to get newly added anchors if you require tracking guaranty.
     *
     * @param hitTestResult The hit test result to use for this anchor creation
     * @param position an optional position offset for this anchor
     * @param rotationQuaternion an optional rotation offset for this anchor
     * @returns A promise that fulfills when babylon has created the corresponding WebXRAnchor object and tracking has begun
     */
    addAnchorPointUsingHitTestResultAsync(hitTestResult: IWebXRHitResult, position?: Vector3, rotationQuaternion?: Quaternion): Promise<IWebXRAnchor>;
    /**
     * Add a new anchor at a specific position and rotation
     * This function will add a new anchor per default in the next available frame. Unless forced, the createAnchor function
     * will be called in the next xrFrame loop to make sure that the anchor can be created correctly.
     * An anchor is tracked only after it is added to the trackerAnchors in xrFrame. The promise returned here does not yet guaranty that.
     * Use onAnchorAddedObservable to get newly added anchors if you require tracking guaranty.
     *
     * @param position the position in which to add an anchor
     * @param rotationQuaternion an optional rotation for the anchor transformation
     * @param forceCreateInCurrentFrame force the creation of this anchor in the current frame. Must be called inside xrFrame loop!
     * @returns A promise that fulfills when babylon has created the corresponding WebXRAnchor object and tracking has begun
     */
    addAnchorAtPositionAndRotationAsync(position: Vector3, rotationQuaternion?: Quaternion, forceCreateInCurrentFrame?: boolean): Promise<IWebXRAnchor>;
    /**
     * Get the list of anchors currently being tracked by the system
     */
    get anchors(): IWebXRAnchor[];
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
    /**
     * avoiding using Array.find for global support.
     * @param xrAnchor the plane to find in the array
     */
    private _findIndexInAnchorArray;
    private _updateAnchorWithXRFrame;
    private _createAnchorAtTransformation;
}
