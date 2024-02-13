import type { Behavior } from "../behavior";
import type { Nullable } from "../../types";
import type { Camera } from "../../Cameras/camera";
import type { TransformNode } from "../../Meshes/transformNode";
/**
 * A behavior that when attached to a mesh will follow a camera
 * @since 5.0.0
 */
export declare class FollowBehavior implements Behavior<TransformNode> {
    private _scene;
    private _tmpQuaternion;
    private _tmpVectors;
    private _tmpMatrix;
    private _tmpInvertView;
    private _tmpForward;
    private _tmpNodeForward;
    private _tmpPosition;
    private _followedCamera;
    private _onBeforeRender;
    private _workingPosition;
    private _workingQuaternion;
    private _lastTick;
    private _recenterNextUpdate;
    /**
     * Attached node of this behavior
     */
    attachedNode: Nullable<TransformNode>;
    /**
     * Set to false if the node should strictly follow the camera without any interpolation time
     */
    interpolatePose: boolean;
    /**
     * Rate of interpolation of position and rotation of the attached node.
     * Higher values will give a slower interpolation.
     */
    lerpTime: number;
    /**
     * If the behavior should ignore the pitch and roll of the camera.
     */
    ignoreCameraPitchAndRoll: boolean;
    /**
     * Pitch offset from camera (relative to Max Distance)
     * Is only effective if `ignoreCameraPitchAndRoll` is set to `true`.
     */
    pitchOffset: number;
    /**
     * The vertical angle from the camera forward axis to the owner will not exceed this value
     */
    maxViewVerticalDegrees: number;
    /**
     * The horizontal angle from the camera forward axis to the owner will not exceed this value
     */
    maxViewHorizontalDegrees: number;
    /**
     * The attached node will not reorient until the angle between its forward vector and the vector to the camera is greater than this value
     */
    orientToCameraDeadzoneDegrees: number;
    /**
     * Option to ignore distance clamping
     */
    ignoreDistanceClamp: boolean;
    /**
     * Option to ignore angle clamping
     */
    ignoreAngleClamp: boolean;
    /**
     * Max vertical distance between the attachedNode and camera
     */
    verticalMaxDistance: number;
    /**
     *  Default distance from eye to attached node, i.e. the sphere radius
     */
    defaultDistance: number;
    /**
     *  Max distance from eye to attached node, i.e. the sphere radius
     */
    maximumDistance: number;
    /**
     *  Min distance from eye to attached node, i.e. the sphere radius
     */
    minimumDistance: number;
    /**
     * Ignore vertical movement and lock the Y position of the object.
     */
    useFixedVerticalOffset: boolean;
    /**
     * Fixed vertical position offset distance.
     */
    fixedVerticalOffset: number;
    /**
     * Enables/disables the behavior
     * @internal
     */
    _enabled: boolean;
    /**
     * The camera that should be followed by this behavior
     */
    get followedCamera(): Nullable<Camera>;
    set followedCamera(camera: Nullable<Camera>);
    /**
     *  The name of the behavior
     */
    get name(): string;
    /**
     *  Initializes the behavior
     */
    init(): void;
    /**
     * Attaches the follow behavior
     * @param ownerNode The mesh that will be following once attached
     * @param followedCamera The camera that should be followed by the node
     */
    attach(ownerNode: TransformNode, followedCamera?: Camera): void;
    /**
     *  Detaches the behavior from the mesh
     */
    detach(): void;
    /**
     * Recenters the attached node in front of the camera on the next update
     */
    recenter(): void;
    private _angleBetweenVectorAndPlane;
    private _length2D;
    private _distanceClamp;
    private _applyVerticalClamp;
    private _toOrientationQuatToRef;
    private _applyPitchOffset;
    private _angularClamp;
    private _orientationClamp;
    private _passedOrientationDeadzone;
    private _updateLeashing;
    private _updateTransformToGoal;
    private _addObservables;
    private _removeObservables;
}
