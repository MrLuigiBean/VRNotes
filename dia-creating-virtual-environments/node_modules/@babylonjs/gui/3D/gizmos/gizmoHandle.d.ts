import type { Scene } from "@babylonjs/core/scene.js";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode.js";
import { Vector3 } from "@babylonjs/core/Maths/math.vector.js";
import { HandleMaterial } from "../materials/handle/handleMaterial";
import type { SlateGizmo } from "./slateGizmo";
import { BaseSixDofDragBehavior } from "@babylonjs/core/Behaviors/Meshes/baseSixDofDragBehavior.js";
/**
 * State of the handle regarding user interaction
 */
export declare enum HandleState {
    /**
     * Handle is idle
     */
    IDLE = 0,
    /**
     * Handle is hovered
     */
    HOVER = 1,
    /**
     * Handle is dragged
     */
    DRAG = 2
}
/**
 * Base class for SlateGizmo handles
 */
export declare abstract class GizmoHandle {
    protected _scene: Scene;
    protected _state: HandleState;
    protected _materials: HandleMaterial[];
    private _dragStartObserver;
    private _draggingObserver;
    private _dragEndObserver;
    /**
     * @internal
     */
    _dragBehavior: BaseSixDofDragBehavior;
    /**
     * The current state of the handle
     */
    get state(): HandleState;
    private _gizmo;
    /**
     * Returns the gizmo carrying this handle
     */
    get gizmo(): SlateGizmo;
    /**
     * Sets hover state
     */
    set hover(value: boolean);
    /**
     * Sets drag state
     */
    set drag(value: boolean);
    /**
     * Node of this handle
     */
    node: TransformNode;
    /**
     * Creates a handle for a SlateGizmo
     * @param gizmo associated SlateGizmo
     * @param scene scene
     */
    constructor(gizmo: SlateGizmo, scene: Scene);
    protected _createMaterial(positionOffset?: Vector3): HandleMaterial;
    private _updateMaterial;
    /**
     * Binds callbacks from dragging interaction
     * @param dragStartFn Function to call on drag start
     * @param dragFn Function to call on drag
     * @param dragEndFn Function to call on drag end
     */
    setDragBehavior(dragStartFn: (event: {
        position: Vector3;
    }) => void, dragFn: (event: {
        position: Vector3;
    }) => void, dragEndFn: () => void): void;
    /**
     * Creates the meshes and parent node of the handle
     * Should be overridden by child classes
     * @returns created node
     */
    abstract createNode(): TransformNode;
    /**
     * Disposes the handle
     */
    dispose(): void;
}
/**
 * Side handle class that rotates the slate
 */
export declare class SideHandle extends GizmoHandle {
    /**
     * Creates the meshes and parent node of the handle
     * @returns created node
     */
    createNode(): TransformNode;
}
/**
 * Corner handle that resizes the slate
 */
export declare class CornerHandle extends GizmoHandle {
    /**
     * Creates the meshes and parent node of the handle
     * @returns created node
     */
    createNode(): TransformNode;
}
