import type { TransformNode } from "../../Meshes/transformNode";
import type { WebXRFeaturesManager } from "../../XR/webXRFeaturesManager";
import type { WebXRExperienceHelper } from "../../XR/webXRExperienceHelper";
import type { Behavior } from "../behavior";
/**
 * Zones around the hand
 */
export declare enum HandConstraintZone {
    /**
     * Above finger tips
     */
    ABOVE_FINGER_TIPS = 0,
    /**
     * Next to the thumb
     */
    RADIAL_SIDE = 1,
    /**
     * Next to the pinky finger
     */
    ULNAR_SIDE = 2,
    /**
     * Below the wrist
     */
    BELOW_WRIST = 3
}
/**
 * Orientations for the hand zones and for the attached node
 */
export declare enum HandConstraintOrientation {
    /**
     * Orientation is towards the camera
     */
    LOOK_AT_CAMERA = 0,
    /**
     * Orientation is determined by the rotation of the palm
     */
    HAND_ROTATION = 1
}
/**
 * Orientations for the hand zones and for the attached node
 */
export declare enum HandConstraintVisibility {
    /**
     * Constraint is always visible
     */
    ALWAYS_VISIBLE = 0,
    /**
     * Constraint is only visible when the palm is up
     */
    PALM_UP = 1,
    /**
     * Constraint is only visible when the user is looking at the constraint.
     * Uses XR Eye Tracking if enabled/available, otherwise uses camera direction
     */
    GAZE_FOCUS = 2,
    /**
     * Constraint is only visible when the palm is up and the user is looking at it
     */
    PALM_AND_GAZE = 3
}
/**
 * Hand constraint behavior that makes the attached `TransformNode` follow hands in XR experiences.
 * @since 5.0.0
 */
export declare class HandConstraintBehavior implements Behavior<TransformNode> {
    private _scene;
    private _node;
    private _eyeTracking;
    private _handTracking;
    private _sceneRenderObserver;
    private _zoneAxis;
    /**
     * Sets the HandConstraintVisibility level for the hand constraint
     */
    handConstraintVisibility: HandConstraintVisibility;
    /**
     * A number from 0.0 to 1.0, marking how restricted the direction the palm faces is for the attached node to be enabled.
     * A 1 means the palm must be directly facing the user before the node is enabled, a 0 means it is always enabled.
     * Used with HandConstraintVisibility.PALM_UP
     */
    palmUpStrictness: number;
    /**
     * The radius in meters around the center of the hand that the user must gaze inside for the attached node to be enabled and appear.
     * Used with HandConstraintVisibility.GAZE_FOCUS
     */
    gazeProximityRadius: number;
    /**
     * Offset distance from the hand in meters
     */
    targetOffset: number;
    /**
     * Where to place the node regarding the center of the hand.
     */
    targetZone: HandConstraintZone;
    /**
     * Orientation mode of the 4 zones around the hand
     */
    zoneOrientationMode: HandConstraintOrientation;
    /**
     * Orientation mode of the node attached to this behavior
     */
    nodeOrientationMode: HandConstraintOrientation;
    /**
     * Set the hand this behavior should follow. If set to "none", it will follow any visible hand (prioritising the left one).
     */
    handedness: XRHandedness;
    /**
     * Rate of interpolation of position and rotation of the attached node.
     * Higher values will give a slower interpolation.
     */
    lerpTime: number;
    /**
     * Builds a hand constraint behavior
     */
    constructor();
    /** gets or sets behavior's name */
    get name(): string;
    /** Enable the behavior */
    enable(): void;
    /** Disable the behavior */
    disable(): void;
    private _getHandPose;
    /**
     * Initializes the hand constraint behavior
     */
    init(): void;
    /**
     * Attaches the hand constraint to a `TransformNode`
     * @param node defines the node to attach the behavior to
     */
    attach(node: TransformNode): void;
    private _setVisibility;
    /**
     * Detaches the behavior from the `TransformNode`
     */
    detach(): void;
    /**
     * Links the behavior to the XR experience in which to retrieve hand transform information.
     * @param xr xr experience
     */
    linkToXRExperience(xr: WebXRExperienceHelper | WebXRFeaturesManager): void;
}
