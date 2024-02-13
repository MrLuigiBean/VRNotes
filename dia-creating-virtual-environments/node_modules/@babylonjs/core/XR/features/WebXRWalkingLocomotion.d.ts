import type { TransformNode } from "../../Meshes/transformNode";
import type { WebXRCamera } from "../webXRCamera";
import type { WebXRSessionManager } from "../webXRSessionManager";
import { WebXRAbstractFeature } from "./WebXRAbstractFeature";
/**
 * Options for the walking locomotion feature.
 */
export interface IWebXRWalkingLocomotionOptions {
    /**
     * The target to be moved by walking locomotion. This should be the transform node
     * which is the root of the XR space (i.e., the WebXRCamera's parent node). However,
     * for simple cases and legacy purposes, articulating the WebXRCamera itself is also
     * supported as a deprecated feature.
     */
    locomotionTarget: WebXRCamera | TransformNode;
}
/**
 * A module that will enable VR locomotion by detecting when the user walks in place.
 */
export declare class WebXRWalkingLocomotion extends WebXRAbstractFeature {
    /**
     * The module's name.
     */
    static get Name(): string;
    /**
     * The (Babylon) version of this module.
     * This is an integer representing the implementation version.
     * This number has no external basis.
     */
    static get Version(): number;
    private _sessionManager;
    private _up;
    private _forward;
    private _position;
    private _movement;
    private _walker;
    private _locomotionTarget;
    private _isLocomotionTargetWebXRCamera;
    /**
     * The target to be articulated by walking locomotion.
     * When the walking locomotion feature detects walking in place, this element's
     * X and Z coordinates will be modified to reflect locomotion. This target should
     * be either the XR space's origin (i.e., the parent node of the WebXRCamera) or
     * the WebXRCamera itself. Note that the WebXRCamera path will modify the position
     * of the WebXRCamera directly and is thus discouraged.
     */
    get locomotionTarget(): WebXRCamera | TransformNode;
    /**
     * The target to be articulated by walking locomotion.
     * When the walking locomotion feature detects walking in place, this element's
     * X and Z coordinates will be modified to reflect locomotion. This target should
     * be either the XR space's origin (i.e., the parent node of the WebXRCamera) or
     * the WebXRCamera itself. Note that the WebXRCamera path will modify the position
     * of the WebXRCamera directly and is thus discouraged.
     */
    set locomotionTarget(locomotionTarget: WebXRCamera | TransformNode);
    /**
     * Construct a new Walking Locomotion feature.
     * @param sessionManager manager for the current XR session
     * @param options creation options, prominently including the vector target for locomotion
     */
    constructor(sessionManager: WebXRSessionManager, options: IWebXRWalkingLocomotionOptions);
    /**
     * Checks whether this feature is compatible with the current WebXR session.
     * Walking locomotion is only compatible with "immersive-vr" sessions.
     * @returns true if compatible, false otherwise
     */
    isCompatible(): boolean;
    /**
     * Attaches the feature.
     * Typically called automatically by the features manager.
     * @returns true if attach succeeded, false otherwise
     */
    attach(): boolean;
    /**
     * Detaches the feature.
     * Typically called automatically by the features manager.
     * @returns true if detach succeeded, false otherwise
     */
    detach(): boolean;
    protected _onXRFrame(frame: XRFrame): void;
}
