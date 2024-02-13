import type { Mesh } from "../../Meshes/mesh";
import { Vector3, Quaternion } from "../../Maths/math.vector";
import { Observable } from "../../Misc/observable";
import { BaseSixDofDragBehavior } from "./baseSixDofDragBehavior";
/**
 * A behavior that when attached to a mesh will allow the mesh to be dragged around based on directions and origin of the pointer's ray
 */
export declare class SixDofDragBehavior extends BaseSixDofDragBehavior {
    private _sceneRenderObserver;
    private _virtualTransformNode;
    protected _targetPosition: Vector3;
    protected _targetOrientation: Quaternion;
    protected _targetScaling: Vector3;
    protected _startingPosition: Vector3;
    protected _startingOrientation: Quaternion;
    protected _startingScaling: Vector3;
    /**
     * Fires when position is updated
     */
    onPositionChangedObservable: Observable<{
        position: Vector3;
    }>;
    /**
     * The distance towards the target drag position to move each frame. This can be useful to avoid jitter. Set this to 1 for no delay. (Default: 0.2)
     */
    dragDeltaRatio: number;
    /**
     * If the object should rotate to face the drag origin
     */
    rotateDraggedObject: boolean;
    /**
     * If `rotateDraggedObject` is set to `true`, this parameter determines if we are only rotating around the y axis (yaw)
     */
    rotateAroundYOnly: boolean;
    /**
     * Should the behavior rotate 1:1 with the motion controller, when one is used.
     */
    rotateWithMotionController: boolean;
    /**
     *  The name of the behavior
     */
    get name(): string;
    /**
     * Use this flag to update the target but not move the owner node towards the target
     */
    disableMovement: boolean;
    /**
     * Should the object rotate towards the camera when we start dragging it
     */
    faceCameraOnDragStart: boolean;
    /**
     * Attaches the six DoF drag behavior
     * @param ownerNode The mesh that will be dragged around once attached
     */
    attach(ownerNode: Mesh): void;
    private _getPositionOffsetAround;
    private _onePointerPositionUpdated;
    private _twoPointersPositionUpdated;
    protected _targetDragStart(): void;
    protected _targetDrag(worldDeltaPosition: Vector3, worldDeltaRotation: Quaternion): void;
    protected _targetDragEnd(): void;
    /**
     *  Detaches the behavior from the mesh
     */
    detach(): void;
}
