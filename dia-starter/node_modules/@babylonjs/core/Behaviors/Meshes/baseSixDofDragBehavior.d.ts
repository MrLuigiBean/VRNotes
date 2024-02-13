import type { Behavior } from "../../Behaviors/behavior";
import type { Mesh } from "../../Meshes/mesh";
import { AbstractMesh } from "../../Meshes/abstractMesh";
import { Scene } from "../../scene";
import type { Nullable } from "../../types";
import { Vector3, Quaternion } from "../../Maths/math.vector";
import { Observable } from "../../Misc/observable";
import type { TransformNode } from "../../Meshes/transformNode";
import type { PickingInfo } from "../../Collisions/pickingInfo";
/**
 * Data store to track virtual pointers movement
 */
type VirtualMeshInfo = {
    dragging: boolean;
    moving: boolean;
    dragMesh: AbstractMesh;
    originMesh: AbstractMesh;
    pivotMesh: AbstractMesh;
    startingPivotPosition: Vector3;
    startingPivotOrientation: Quaternion;
    startingPosition: Vector3;
    startingOrientation: Quaternion;
    lastOriginPosition: Vector3;
    lastDragPosition: Vector3;
};
/**
 * Base behavior for six degrees of freedom interactions in XR experiences.
 * Creates virtual meshes that are dragged around
 * And observables for position/rotation changes
 */
export declare class BaseSixDofDragBehavior implements Behavior<Mesh> {
    protected static _virtualScene: Scene;
    private _pointerObserver;
    private _attachedToElement;
    protected _virtualMeshesInfo: {
        [id: number]: VirtualMeshInfo;
    };
    private _tmpVector;
    private _tmpQuaternion;
    protected _dragType: {
        NONE: number;
        DRAG: number;
        DRAG_WITH_CONTROLLER: number;
        NEAR_DRAG: number;
    };
    protected _scene: Scene;
    protected _moving: boolean;
    protected _ownerNode: TransformNode;
    protected _dragging: number;
    /**
     * The list of child meshes that can receive drag events
     * If `null`, all child meshes will receive drag event
     */
    draggableMeshes: Nullable<AbstractMesh[]>;
    /**
     * How much faster the object should move when the controller is moving towards it. This is useful to bring objects that are far away from the user to them faster. Set this to 0 to avoid any speed increase. (Default: 3)
     */
    zDragFactor: number;
    /**
     * The id of the pointer that is currently interacting with the behavior (-1 when no pointer is active)
     */
    get currentDraggingPointerId(): number;
    set currentDraggingPointerId(value: number);
    /**
     * In case of multipointer interaction, all pointer ids currently active are stored here
     */
    currentDraggingPointerIds: number[];
    /**
     * Get or set the currentDraggingPointerId
     * @deprecated Please use currentDraggingPointerId instead
     */
    get currentDraggingPointerID(): number;
    set currentDraggingPointerID(currentDraggingPointerID: number);
    /**
    /**
     * If camera controls should be detached during the drag
     */
    detachCameraControls: boolean;
    /**
     * Fires each time a drag starts
     */
    onDragStartObservable: Observable<{
        position: Vector3;
    }>;
    /**
     * Fires each time a drag happens
     */
    onDragObservable: Observable<{
        delta: Vector3;
        position: Vector3;
        pickInfo: PickingInfo;
    }>;
    /**
     *  Fires each time a drag ends (eg. mouse release after drag)
     */
    onDragEndObservable: Observable<{}>;
    /**
     * Should the behavior allow simultaneous pointers to interact with the owner node.
     */
    allowMultiPointer: boolean;
    /**
     *  The name of the behavior
     */
    get name(): string;
    /**
     *  Returns true if the attached mesh is currently moving with this behavior
     */
    get isMoving(): boolean;
    /**
     *  Initializes the behavior
     */
    init(): void;
    /**
     * In the case of multiple active cameras, the cameraToUseForPointers should be used if set instead of active camera
     */
    private get _pointerCamera();
    private _createVirtualMeshInfo;
    protected _resetVirtualMeshesPosition(): void;
    private _pointerUpdate2D;
    private _pointerUpdateXR;
    /**
     * Attaches the scale behavior the passed in mesh
     * @param ownerNode The mesh that will be scaled around once attached
     */
    attach(ownerNode: TransformNode): void;
    private _applyZOffset;
    protected _targetDragStart(worldPosition: Vector3, worldRotation: Quaternion, pointerId: number): void;
    protected _targetDrag(worldDeltaPosition: Vector3, worldDeltaRotation: Quaternion, pointerId: number): void;
    protected _targetDragEnd(pointerId: number): void;
    protected _reattachCameraControls(): void;
    /**
     * Detaches the behavior from the mesh
     */
    detach(): void;
}
export {};
