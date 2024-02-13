import { WebXRAbstractFeature } from "./WebXRAbstractFeature";
import type { WebXRSessionManager } from "../webXRSessionManager";
import type { AbstractMesh } from "../../Meshes/abstractMesh";
import type { Mesh } from "../../Meshes/mesh";
import type { WebXRInput } from "../webXRInput";
import type { WebXRInputSource } from "../webXRInputSource";
import type { Nullable } from "../../types";
import type { IDisposable } from "../../scene";
import { Observable } from "../../Misc/observable";
import type { InstancedMesh } from "../../Meshes/instancedMesh";
import { Color3 } from "../../Maths/math.color";
/**
 * Configuration interface for the hand tracking feature
 */
export interface IWebXRHandTrackingOptions {
    /**
     * The xrInput that will be used as source for new hands
     */
    xrInput: WebXRInput;
    /**
     * Configuration object for the joint meshes.
     */
    jointMeshes?: {
        /**
         * Should the meshes created be invisible (defaults to false).
         */
        invisible?: boolean;
        /**
         * A source mesh to be used to create instances. Defaults to an icosphere with two subdivisions and smooth lighting.
         * This mesh will be the source for all other (25) meshes.
         * It should have the general size of a single unit, as the instances will be scaled according to the provided radius.
         */
        sourceMesh?: Mesh;
        /**
         * This function will be called after a mesh was created for a specific joint.
         * Using this function you can either manipulate the instance or return a new mesh.
         * When returning a new mesh the instance created before will be disposed.
         * @param meshInstance An instance of the original joint mesh being used for the joint.
         * @param jointId The joint's index, see https://immersive-web.github.io/webxr-hand-input/#skeleton-joints-section for more info.
         * @param hand Which hand ("left", "right") the joint will be on.
         */
        onHandJointMeshGenerated?: (meshInstance: InstancedMesh, jointId: number, hand: XRHandedness) => AbstractMesh | undefined;
        /**
         * Should the source mesh stay visible (defaults to false).
         */
        keepOriginalVisible?: boolean;
        /**
         * Should each instance have its own physics impostor
         */
        enablePhysics?: boolean;
        /**
         * If enabled, override default physics properties
         */
        physicsProps?: {
            friction?: number;
            restitution?: number;
            impostorType?: number;
        };
        /**
         * Scale factor for all joint meshes (defaults to 1)
         */
        scaleFactor?: number;
    };
    /**
     * Configuration object for the hand meshes.
     */
    handMeshes?: {
        /**
         * Should the default hand mesh be disabled. In this case, the spheres will be visible (unless set invisible).
         */
        disableDefaultMeshes?: boolean;
        /**
         * Rigged hand meshes that will be tracked to the user's hands. This will override the default hand mesh.
         */
        customMeshes?: {
            right: AbstractMesh;
            left: AbstractMesh;
        };
        /**
         * Are the meshes prepared for a left-handed system. Default hand meshes are right-handed.
         */
        meshesUseLeftHandedCoordinates?: boolean;
        /**
         * If a hand mesh was provided, this array will define what axis will update which node. This will override the default hand mesh
         */
        customRigMappings?: {
            right: XRHandMeshRigMapping;
            left: XRHandMeshRigMapping;
        };
        /**
         * Override the colors of the hand meshes.
         */
        customColors?: {
            base?: Color3;
            fresnel?: Color3;
            fingerColor?: Color3;
            tipFresnel?: Color3;
        };
    };
}
/**
 * Parts of the hands divided to writs and finger names
 */
export declare enum HandPart {
    /**
     * HandPart - Wrist
     */
    WRIST = "wrist",
    /**
     * HandPart - The thumb
     */
    THUMB = "thumb",
    /**
     * HandPart - Index finger
     */
    INDEX = "index",
    /**
     * HandPart - Middle finger
     */
    MIDDLE = "middle",
    /**
     * HandPart - Ring finger
     */
    RING = "ring",
    /**
     * HandPart - Little finger
     */
    LITTLE = "little"
}
/**
 * Joints of the hand as defined by the WebXR specification.
 * https://immersive-web.github.io/webxr-hand-input/#skeleton-joints-section
 */
export declare enum WebXRHandJoint {
    /** Wrist */
    WRIST = "wrist",
    /** Thumb near wrist */
    THUMB_METACARPAL = "thumb-metacarpal",
    /** Thumb first knuckle */
    THUMB_PHALANX_PROXIMAL = "thumb-phalanx-proximal",
    /** Thumb second knuckle */
    THUMB_PHALANX_DISTAL = "thumb-phalanx-distal",
    /** Thumb tip */
    THUMB_TIP = "thumb-tip",
    /** Index finger near wrist */
    INDEX_FINGER_METACARPAL = "index-finger-metacarpal",
    /** Index finger first knuckle */
    INDEX_FINGER_PHALANX_PROXIMAL = "index-finger-phalanx-proximal",
    /** Index finger second knuckle */
    INDEX_FINGER_PHALANX_INTERMEDIATE = "index-finger-phalanx-intermediate",
    /** Index finger third knuckle */
    INDEX_FINGER_PHALANX_DISTAL = "index-finger-phalanx-distal",
    /** Index finger tip */
    INDEX_FINGER_TIP = "index-finger-tip",
    /** Middle finger near wrist */
    MIDDLE_FINGER_METACARPAL = "middle-finger-metacarpal",
    /** Middle finger first knuckle */
    MIDDLE_FINGER_PHALANX_PROXIMAL = "middle-finger-phalanx-proximal",
    /** Middle finger second knuckle */
    MIDDLE_FINGER_PHALANX_INTERMEDIATE = "middle-finger-phalanx-intermediate",
    /** Middle finger third knuckle */
    MIDDLE_FINGER_PHALANX_DISTAL = "middle-finger-phalanx-distal",
    /** Middle finger tip */
    MIDDLE_FINGER_TIP = "middle-finger-tip",
    /** Ring finger near wrist */
    RING_FINGER_METACARPAL = "ring-finger-metacarpal",
    /** Ring finger first knuckle */
    RING_FINGER_PHALANX_PROXIMAL = "ring-finger-phalanx-proximal",
    /** Ring finger second knuckle */
    RING_FINGER_PHALANX_INTERMEDIATE = "ring-finger-phalanx-intermediate",
    /** Ring finger third knuckle */
    RING_FINGER_PHALANX_DISTAL = "ring-finger-phalanx-distal",
    /** Ring finger tip */
    RING_FINGER_TIP = "ring-finger-tip",
    /** Pinky finger near wrist */
    PINKY_FINGER_METACARPAL = "pinky-finger-metacarpal",
    /** Pinky finger first knuckle */
    PINKY_FINGER_PHALANX_PROXIMAL = "pinky-finger-phalanx-proximal",
    /** Pinky finger second knuckle */
    PINKY_FINGER_PHALANX_INTERMEDIATE = "pinky-finger-phalanx-intermediate",
    /** Pinky finger third knuckle */
    PINKY_FINGER_PHALANX_DISTAL = "pinky-finger-phalanx-distal",
    /** Pinky finger tip */
    PINKY_FINGER_TIP = "pinky-finger-tip"
}
/** A type encapsulating a dictionary mapping WebXR joints to bone names in a rigged hand mesh.  */
export type XRHandMeshRigMapping = {
    [webXRJointName in WebXRHandJoint]: string;
};
/**
 * Representing a single hand (with its corresponding native XRHand object)
 */
export declare class WebXRHand implements IDisposable {
    /** The controller to which the hand correlates. */
    readonly xrController: WebXRInputSource;
    private readonly _jointMeshes;
    private _handMesh;
    /** An optional rig mapping for the hand mesh. If not provided (but a hand mesh is provided),
     * it will be assumed that the hand mesh's bones are named directly after the WebXR bone names. */
    readonly rigMapping: Nullable<XRHandMeshRigMapping>;
    private readonly _leftHandedMeshes;
    private readonly _jointsInvisible;
    private readonly _jointScaleFactor;
    private _scene;
    /**
     * Transform nodes that will directly receive the transforms from the WebXR matrix data.
     */
    private _jointTransforms;
    /**
     * The float array that will directly receive the transform matrix data from WebXR.
     */
    private _jointTransformMatrices;
    private _tempJointMatrix;
    /**
     * The float array that will directly receive the joint radii from WebXR.
     */
    private _jointRadii;
    /**
     * Get the hand mesh.
     */
    get handMesh(): Nullable<AbstractMesh>;
    /**
     * Get meshes of part of the hand.
     * @param part The part of hand to get.
     * @returns An array of meshes that correlate to the hand part requested.
     */
    getHandPartMeshes(part: HandPart): AbstractMesh[];
    /**
     * Retrieves a mesh linked to a named joint in the hand.
     * @param jointName The name of the joint.
     * @returns An AbstractMesh whose position corresponds with the joint position.
     */
    getJointMesh(jointName: WebXRHandJoint): AbstractMesh;
    /**
     * Construct a new hand object
     * @param xrController The controller to which the hand correlates.
     * @param _jointMeshes The meshes to be used to track the hand joints.
     * @param _handMesh An optional hand mesh.
     * @param rigMapping An optional rig mapping for the hand mesh.
     *                   If not provided (but a hand mesh is provided),
     *                   it will be assumed that the hand mesh's bones are named
     *                   directly after the WebXR bone names.
     * @param _leftHandedMeshes Are the hand meshes left-handed-system meshes
     * @param _jointsInvisible Are the tracked joint meshes visible
     * @param _jointScaleFactor Scale factor for all joint meshes
     */
    constructor(
    /** The controller to which the hand correlates. */
    xrController: WebXRInputSource, _jointMeshes: AbstractMesh[], _handMesh: Nullable<AbstractMesh>, 
    /** An optional rig mapping for the hand mesh. If not provided (but a hand mesh is provided),
     * it will be assumed that the hand mesh's bones are named directly after the WebXR bone names. */
    rigMapping: Nullable<XRHandMeshRigMapping>, _leftHandedMeshes?: boolean, _jointsInvisible?: boolean, _jointScaleFactor?: number);
    /**
     * Sets the current hand mesh to render for the WebXRHand.
     * @param handMesh The rigged hand mesh that will be tracked to the user's hand.
     * @param rigMapping The mapping from XRHandJoint to bone names to use with the mesh.
     */
    setHandMesh(handMesh: AbstractMesh, rigMapping: Nullable<XRHandMeshRigMapping>): void;
    /**
     * Update this hand from the latest xr frame.
     * @param xrFrame The latest frame received from WebXR.
     * @param referenceSpace The current viewer reference space.
     */
    updateFromXRFrame(xrFrame: XRFrame, referenceSpace: XRReferenceSpace): void;
    /**
     * Dispose this Hand object
     */
    dispose(): void;
}
/**
 * WebXR Hand Joint tracking feature, available for selected browsers and devices
 */
export declare class WebXRHandTracking extends WebXRAbstractFeature {
    /** Options to use when constructing this feature. */
    readonly options: IWebXRHandTrackingOptions;
    /**
     * The module's name
     */
    static readonly Name = "xr-hand-tracking";
    /**
     * The (Babylon) version of this module.
     * This is an integer representing the implementation version.
     * This number does not correspond to the WebXR specs version
     */
    static readonly Version = 1;
    /** The base URL for the default hand model. */
    static DEFAULT_HAND_MODEL_BASE_URL: string;
    /** The filename to use for the default right hand model. */
    static DEFAULT_HAND_MODEL_RIGHT_FILENAME: string;
    /** The filename to use for the default left hand model. */
    static DEFAULT_HAND_MODEL_LEFT_FILENAME: string;
    /** The URL pointing to the default hand model NodeMaterial shader. */
    static DEFAULT_HAND_MODEL_SHADER_URL: string;
    private static readonly _ICOSPHERE_PARAMS;
    private static _RightHandGLB;
    private static _LeftHandGLB;
    private static _GenerateTrackedJointMeshes;
    private static _GenerateDefaultHandMeshesAsync;
    /**
     * Generates a mapping from XRHandJoint to bone name for the default hand mesh.
     * @param handedness The handedness being mapped for.
     */
    private static _GenerateDefaultHandMeshRigMapping;
    private _attachedHands;
    private _trackingHands;
    private _handResources;
    /**
     * This observable will notify registered observers when a new hand object was added and initialized
     */
    onHandAddedObservable: Observable<WebXRHand>;
    /**
     * This observable will notify its observers right before the hand object is disposed
     */
    onHandRemovedObservable: Observable<WebXRHand>;
    /**
     * Check if the needed objects are defined.
     * This does not mean that the feature is enabled, but that the objects needed are well defined.
     */
    isCompatible(): boolean;
    /**
     * Get the hand object according to the controller id
     * @param controllerId the controller id to which we want to get the hand
     * @returns null if not found or the WebXRHand object if found
     */
    getHandByControllerId(controllerId: string): Nullable<WebXRHand>;
    /**
     * Get a hand object according to the requested handedness
     * @param handedness the handedness to request
     * @returns null if not found or the WebXRHand object if found
     */
    getHandByHandedness(handedness: XRHandedness): Nullable<WebXRHand>;
    /**
     * Creates a new instance of the XR hand tracking feature.
     * @param _xrSessionManager An instance of WebXRSessionManager.
     * @param options Options to use when constructing this feature.
     */
    constructor(_xrSessionManager: WebXRSessionManager, 
    /** Options to use when constructing this feature. */
    options: IWebXRHandTrackingOptions);
    /**
     * Attach this feature.
     * Will usually be called by the features manager.
     *
     * @returns true if successful.
     */
    attach(): boolean;
    protected _onXRFrame(_xrFrame: XRFrame): void;
    private _attachHand;
    private _detachHandById;
    private _detachHand;
    /**
     * Detach this feature.
     * Will usually be called by the features manager.
     *
     * @returns true if successful.
     */
    detach(): boolean;
    /**
     * Dispose this feature and all of the resources attached.
     */
    dispose(): void;
}
