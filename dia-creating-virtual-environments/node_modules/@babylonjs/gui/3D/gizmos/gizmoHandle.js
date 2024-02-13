import { CreateBox } from "@babylonjs/core/Meshes/Builders/boxBuilder.js";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode.js";
import { Vector3 } from "@babylonjs/core/Maths/math.vector.js";
import { HandleMaterial } from "../materials/handle/handleMaterial.js";
import { BaseSixDofDragBehavior } from "@babylonjs/core/Behaviors/Meshes/baseSixDofDragBehavior.js";
/**
 * State of the handle regarding user interaction
 */
export var HandleState;
(function (HandleState) {
    /**
     * Handle is idle
     */
    HandleState[HandleState["IDLE"] = 0] = "IDLE";
    /**
     * Handle is hovered
     */
    HandleState[HandleState["HOVER"] = 1] = "HOVER";
    /**
     * Handle is dragged
     */
    HandleState[HandleState["DRAG"] = 2] = "DRAG";
})(HandleState || (HandleState = {}));
/**
 * Base class for SlateGizmo handles
 */
export class GizmoHandle {
    /**
     * The current state of the handle
     */
    get state() {
        return this._state;
    }
    /**
     * Returns the gizmo carrying this handle
     */
    get gizmo() {
        return this._gizmo;
    }
    /**
     * Sets hover state
     */
    set hover(value) {
        if (value) {
            this._state |= HandleState.HOVER;
        }
        else {
            this._state &= ~HandleState.HOVER;
        }
        this._updateMaterial();
    }
    /**
     * Sets drag state
     */
    set drag(value) {
        if (value) {
            this._state |= HandleState.DRAG;
        }
        else {
            this._state &= ~HandleState.DRAG;
        }
        this._updateMaterial();
    }
    /**
     * Creates a handle for a SlateGizmo
     * @param gizmo associated SlateGizmo
     * @param scene scene
     */
    constructor(gizmo, scene) {
        this._state = HandleState.IDLE;
        this._materials = [];
        this._scene = scene;
        this._gizmo = gizmo;
        this.node = this.createNode();
        this.node.reservedDataStore = {
            handle: this,
        };
    }
    _createMaterial(positionOffset) {
        const mat = new HandleMaterial("handle", this._scene);
        if (positionOffset) {
            mat._positionOffset = positionOffset;
        }
        return mat;
    }
    _updateMaterial() {
        const state = this._state;
        for (const mat of this._materials) {
            mat.hover = false;
            mat.drag = false;
        }
        if (state & HandleState.DRAG) {
            for (const mat of this._materials) {
                mat.drag = true;
            }
        }
        else if (state & HandleState.HOVER) {
            for (const mat of this._materials) {
                mat.hover = true;
            }
        }
    }
    /**
     * Binds callbacks from dragging interaction
     * @param dragStartFn Function to call on drag start
     * @param dragFn Function to call on drag
     * @param dragEndFn Function to call on drag end
     */
    setDragBehavior(dragStartFn, dragFn, dragEndFn) {
        const dragBehavior = new BaseSixDofDragBehavior();
        this._dragBehavior = dragBehavior;
        this._dragStartObserver = dragBehavior.onDragStartObservable.add(dragStartFn);
        this._draggingObserver = dragBehavior.onDragObservable.add(dragFn);
        this._dragEndObserver = dragBehavior.onDragEndObservable.add(dragEndFn);
        this._dragBehavior.attach(this.node);
    }
    /**
     * Disposes the handle
     */
    dispose() {
        this._dragBehavior.onDragStartObservable.remove(this._dragStartObserver);
        this._dragBehavior.onDragObservable.remove(this._draggingObserver);
        this._dragBehavior.onDragEndObservable.remove(this._dragEndObserver);
        this._dragBehavior.detach();
        for (const material of this._materials) {
            material.dispose();
        }
        this.node.dispose();
    }
}
/**
 * Side handle class that rotates the slate
 */
export class SideHandle extends GizmoHandle {
    /**
     * Creates the meshes and parent node of the handle
     * @returns created node
     */
    createNode() {
        // Create a simple vertical rectangle
        const verticalBox = CreateBox("sideVert", { width: 1, height: 10, depth: 0.1 }, this._scene);
        const sideNode = new TransformNode("side", this._scene);
        verticalBox.parent = sideNode;
        const mat = this._createMaterial();
        verticalBox.material = mat;
        verticalBox.isNearGrabbable = true;
        this._materials.push(mat);
        return sideNode;
    }
}
/**
 * Corner handle that resizes the slate
 */
export class CornerHandle extends GizmoHandle {
    /**
     * Creates the meshes and parent node of the handle
     * @returns created node
     */
    createNode() {
        // Create 2 boxes making a bottom left corner
        const horizontalBox = CreateBox("angleHor", { width: 3, height: 1, depth: 0.1 }, this._scene);
        const verticalBox = CreateBox("angleVert", { width: 1, height: 3, depth: 0.1 }, this._scene);
        const angleNode = new TransformNode("angle", this._scene);
        horizontalBox.parent = angleNode;
        verticalBox.parent = angleNode;
        horizontalBox.material = this._createMaterial(new Vector3(1, 0, 0));
        verticalBox.material = this._createMaterial(new Vector3(0, 1, 0));
        verticalBox.isNearGrabbable = true;
        horizontalBox.isNearGrabbable = true;
        this._materials.push(horizontalBox.material);
        this._materials.push(verticalBox.material);
        return angleNode;
    }
}
//# sourceMappingURL=gizmoHandle.js.map